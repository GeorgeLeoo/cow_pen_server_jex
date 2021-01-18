// dataType.js
 const isObject = (obj) =>
	Object.prototype.toString.call(obj) === '[object Object]'
 const isNumber = (obj) =>
	Object.prototype.toString.call(obj) === '[object Number]'
 const isString = (obj) =>
	Object.prototype.toString.call(obj) === '[object String]'
 const isUndefined = (obj) =>
	Object.prototype.toString.call(obj) === '[object Undefined]'
 const isBoolean = (obj) =>
	Object.prototype.toString.call(obj) === '[object Boolean]'
 const isArray = (obj) =>
	Object.prototype.toString.call(obj) === '[object Array]'
 const isFunction = (obj) =>
	Object.prototype.toString.call(obj) === '[object Function]'
 const isNull = (obj) =>
	Object.prototype.toString.call(obj) === '[object Null]'

module.exports = {
	isObject,
	isNumber,
	isString,
	isUndefined,
	isBoolean,
	isArray,
	isFunction,
	isNull,
}
