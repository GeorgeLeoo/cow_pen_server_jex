const {
    getCondition,
    getFilter,
    getTotalDocs,
} = require('./utils')
const { isEmptyObject } = require('../utils/Utils')
const { isFunction } = require('../utils/dataType')

async function find(config, model, route, params, useUnique, useInformation) {
	const { db, responseParams } = route
	const { collection, where, remove, sort, populate, group, unique } = db
	let whereData = getCondition(config, where, params, remove)

	const uniqueData = getCondition(config, unique, params, remove)

	if (useUnique && unique.length > 0) {
		whereData = uniqueData
	}

	if (useInformation) {
		whereData = { _id: params._id }
	}

	const filter = getFilter(responseParams)

	let { pageSize, pageNumber } = params

	pageSize = parseInt(pageSize)
	pageNumber = parseInt(pageNumber)

	if (!Number.isNaN(pageSize) && pageSize < 1) {
		koaResponse.failClient('pageSize 必须大于0')
		return
	}

	if (!Number.isNaN(pageNumber) && pageNumber < 1) {
		koaResponse.failClient('pageNumber 必须大于0')
		return
	}

    let result = null
    
	if (isEmptyObject(group)) {
		result = await model[collection]
			.find(whereData, filter)
			.populate(populate)
			.limit(parseInt(pageNumber))
			.skip((parseInt(pageSize) - 1) * parseInt(pageNumber))
			.sort(sort)
	} else {
		result = await model[collection].aggregate([
			{ $match: whereData },
			{ $group: group },
		])
	}

	if (pageSize && pageNumber) {
		const total = await getTotalDocs(model[collection], whereData)
		if (isFunction(route.result)) {
			result = route.result(result)
		}
		const finalData = {
			data: result,
			page: {
				pageSize,
				pageNumber,
				total,
			},
		}
		return finalData
	} else {
		if (isFunction(route.result)) {
			return route.result(result)
		}
		return result
	}
}

module.exports = find
