const { isUndefined, isFunction } = require('../utils/dataType')

function getRealRemove(config, remove) {
	let isRealRemove = config.MONGO.remove

	if (isUndefined(isRealRemove)) {
		isRealRemove = false
	}

	if (!isUndefined(remove)) {
		isRealRemove = remove
	}

	return isRealRemove
}

function getCondition(config, data, params, remove) {
	const finalData = {}

	remove = getRealRemove(config, remove)

	if (!isUndefined(remove) && !remove) {
		finalData.isDelete = 1
	}

	data.forEach((v) => {
		finalData[v] = params[v]
	})

	return finalData
}

function getFilter(responseParams) {
	const filter = {}

	responseParams.forEach((v) => {
		filter[v] = 1
	})

	return filter
}

/**
 * 删除 data 中，第 position 位置上为 char 的字符
 * @param {*} data
 * @param {*} char
 * @param {*} position
 */
function removeCharWithPosition(data, char, position) {
	if (data.charAt(position) === char) {
		const finalData = data.split('')
		finalData.splice(position, 1)
		return finalData.join('')
	}
	return data
}

/**
 * 查询总数量
 * @param condition
 * @returns {Promise<unknown>}
 */
const getTotalDocs = async function (model, condition) {
	return await model.countDocuments(condition)
}

module.exports = {
    getRealRemove,
    getCondition,
    getFilter,
    removeCharWithPosition,
    getTotalDocs,
}
