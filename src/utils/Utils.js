'use strict'

const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const { getValue } = require('../config/modules/RedisConfig')
const utils = require('../../config/utils')
const path = require('path')

const salt = 'coW_pEn_MOb1996GeorgeLeoo12NJ19'

function getConfig() {
	
	const configPath = path.join(utils.APP_PATH, 'config/index.js')
	
	return require(configPath)
}

const config = getConfig()

class Utils { }

Utils.getConfig = getConfig


/**
 * @description 加密
 * @param {string} value
 */
Utils.encryption = (value) => {
	const md5 = require('js-md5')
	return md5(salt + md5(salt + value))
}

Utils.getRedisUid = async (ctx) => {
	const token = ctx.get('authorization').split('Bearer ')[1]
	const encryptionToken = Utils.encryption(token)
	return await getValue(encryptionToken)
}

/**
 * 判断对象是否为空
 * @param obj
 * @returns {boolean}
 */
Utils.isEmptyObject = (obj) => {
	if (typeof obj !== 'object') {
		return true
	}
	if (obj === null) {
		return true
	}
	const keys = Object.keys(JSON.parse(JSON.stringify(obj)))
	return keys.length === 0
}

/**
 * 判断数组是否为空
 * @param {[]} array
 */
Utils.isEmptyArray = (array) => !array || array.length === 0

/**
 * 获取token认证信息
 * @param _id 用户id
 */
Utils.getToken = (_id) => {
	return jsonwebtoken.sign(
		{
			_id,
			exp: config.TOKEN_EXP,
		},
		config.JWT_SECRET
	)
}
Utils.verifyToken = (token) => {
	return new Promise((resolve, reject) => {
		jsonwebtoken.verify(token, config.JWT_SECRET, function (err, decoded) {
			if (typeof decoded === 'string') {
				reject(err)
				return
			}
			resolve(decoded)
		})
	})
}

/**
 * 保存文件
 * @param file  文件
 * @param path  文件路径
 * @returns {Promise<unknown>}
 */
Utils.saveFile = (file, path) => {
	return new Promise((resolve, reject) => {
		const pathArray = path.split('/')
		const length = pathArray.length
		const _path = '/img/' + pathArray[length - 1]

		// 创建可读流
		let render = fs.createReadStream(file.path)
		// 创建写入流
		let upStream = fs.createWriteStream(path)

		render.pipe(upStream)
		upStream.on('finish', () => {
			resolve(_path)
		})
		upStream.on('error', (err) => {
			reject(err)
		})
		resolve(_path)
	})
}
Utils.deepClone = (obj = {}) => {
	// 值类型的情况下直接返回
	// obj 是 null，或者不是对象也不是数组，就直接返回
	if (typeof obj !== 'object' || obj == null) {
		return obj
	}
	// 初始化返回结果,是数组就定义为数组，是对象就定义为对象
	let result
	if (obj instanceof Array) {
		result = []
	} else {
		result = {}
	}

	for (const key in obj) {
		// 判断 key 是否是自身的属性
		// eslint-disable-next-line no-prototype-builtins
		if (obj.hasOwnProperty(key)) {
			// 保证不是原型上的属性
			result[key] = this.deepClone(obj[key])
		}
	}

	return result
}

module.exports = Utils
