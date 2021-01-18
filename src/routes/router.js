const Router = require('koa-router')
const cloneDeep = require('lodash/cloneDeep')
const Response = require('../lib/Response')
const validatorForm = require('../utils/validatorForm')
const model = require('../model/index')
const { isUndefined, isFunction } = require('../utils/dataType')
const {
	isEmptyObject,
	isEmptyArray,
	getToken,
	encryption,
	getConfig,
} = require('../utils/Utils')
const config = getConfig()
const {
	setValue,
	delValue,
	getValue,
} = require('../config/modules/RedisConfig')


const path = require('path')
const utils = require('../../config/utils')

const mainPath = path.join(utils.APP_PATH, 'main/index.js')
const main = require(mainPath)
// const main = require('../../app/main/index')

const requestType = require('./requestType')

const {
	getRealRemove,
    getCondition,
    removeCharWithPosition,
} = require('./utils')

const find = require('./find')

const router = new Router()


async function isExist(route, params) {
	const result = await find(config, model, route, params, true)
	return result.length > 0
}

for (const key in main) {
	const route = main[key]

	let prefix = route.prefix
	let url = route.url
	let method = route.method
	let db = route.db
	let response = route.response

	const mainRules = [
		{ value: url, errorMsg: 'url不能为空', rule: 'empty' },
		{ value: method, errorMsg: 'method不能为空', rule: 'empty' },
	]

	const mainValidator = validatorForm(mainRules)

	if (!mainValidator) {
		throw new Error(mainValidator.getError())
	}

	if (prefix && prefix.length !== 1) {
		prefix = removeCharWithPosition(prefix, '/', 0)
		prefix = removeCharWithPosition(prefix, '/', prefix.length - 1)
	}

	if (url.length !== 1) {
		url = removeCharWithPosition(url, '/', 0)
		url = removeCharWithPosition(url, '/', url.length - 1)
	}

	method = method.toLowerCase()

	let finalUrl = `/${prefix}/${url}`

	router[route.method](finalUrl, async (ctx, next) => {
		const koaResponse = new Response(ctx)

		const params = ctx.request[requestType[route.method]]

		const rules = cloneDeep(route.requestParams)

		if (rules && rules.length > 0) {
			rules.forEach((rule) => (rule.value = params[rule.value]))

			const validator = validatorForm(rules)
			if (!validator) {
				koaResponse.failClient(validatorForm.getError())
				return
			}
		}

		if (isFunction(response)) {
			response({ koaResponse, ctx, next, model })
			return
		}

		const { collection, type, data, where, remove, unique } = db

		let isRealRemove = getRealRemove(config, remove)

		if (type === 'login') {
			const user = await find(config, model, route, params)

			if (isEmptyArray(user)) {
				koaResponse.failClient('用户名或密码不正确')
				return
			}

			const data = {
				token: getToken(user[0]._id),
			}

			setValue(encryption(data.token), user[0]._id.toString())

			koaResponse.success(data)

			return
		}

		if (type === 'logout') {
			const token = ctx.request.header.authorization.split('Bearer ')[1]

			const encryptionToken = encryption(token)

			await delValue(encryptionToken)

			koaResponse.success('退出登录成功')

			return
		}

		if (type === 'information') {
			const token = ctx.request.header.authorization.split('Bearer ')[1]

			const encryptionToken = encryption(token)

			const id = await getValue(encryptionToken)

			if (id) {
				params._id = id
				const user = await find(config, model, route, params, false, true)
				koaResponse.success(user)
			} else {
				koaResponse.failClient('请重新登录')
			}
			return
		}

		if (type === 'find') {
			const result = await find(config, model, route, params)
			koaResponse.success(result)
			return
		}

		if (type === 'insert') {
			const insertData = getCondition(config, data, params, isRealRemove)

			if (!isEmptyArray(unique) && (await isExist(route, params))) {
				koaResponse.failClient(unique + ' is exists')
				return
			}

			const result = await model[collection].insertMany(insertData)

			koaResponse.success(result)

			return
		}

		if (type === 'update') {
			const whereData = getCondition(config, where, params, isRealRemove)
			const updateData = getCondition(config, data, params)

			const result = await model[collection].updateMany(whereData, updateData)

			koaResponse.success(result)

			return
		}

		if (type === 'remove') {
			let result = []

			const whereData = getCondition(config, where, params, remove)

			if (isRealRemove) {
				result = await model[collection].deleteMany(whereData)
			} else {
				const updateData = { isDelete: -1 }

				result = await model[collection].updateMany(whereData, updateData)
			}
			koaResponse.success(result)
			return
		}

		koaResponse.success('type error')
	})
}

module.exports = router
