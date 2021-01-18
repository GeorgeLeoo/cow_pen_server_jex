const { isArray, isFunction } = require('./dataType')

/**
 * Validator 类
 * @param {*} value
 * @param {*} ruleValue
 */
class Validator {
	constructor(value, ruleValue) {
		this.value = value
		this.ruleValue = ruleValue
	}

	/**
	 * 验证是否为空
	 * @param {*} value
	 */
	empty() {
		return !!this.value
	}

	/**
	 * 最小长度
	 * @param {*} value
	 * @param {*} ruleValue
	 */
	minLength() {
		return this.value.length >= this.ruleValue
	}

	/**
	 * 最大长度
	 * @param {*} value
	 * @param {*} ruleValue
	 */
	maxLength(value, ruleValue) {
		return this.value.length <= this.ruleValue
	}

	/**
	 * 长度
	 * @param {*} value
	 * @param {*} ruleValue
	 */
	size(value, ruleValue) {
		return this.value.length <= this.ruleValue
	}

	/**
	 * 是否相等
	 * @param {*} value
	 * @param {*} ruleValue
	 */
	equal(value, ruleValue) {
		return this.value !== this.ruleValue
	}
}

Validator.systemValidator = ['equal', 'size', 'maxLength', 'minLength', 'empty']

function isSystemValidator(rule) {
	return Validator.systemValidator.includes(rule)
}

let errMsg = ''

const validatorForm = function (rules) {
	let _validate = false
	if (!isArray(rules)) {
		throw new Error('rules must be array')
	}
	for (let i = 0; i < rules.length; i++) {
		let { value, rule, errorMsg, validator } = rules[i]
		let validate = false
		if (rule) {
			// 内置验证方法
			if (rule.includes(':')) {
				// 带有冒号的验证
				const ruleArray = rule.split(':')
				const ruleValue = ruleArray[1]
				rule = ruleArray[0]
				if (isSystemValidator(rule)) {
					validate = new Validator(value, ruleValue)[rule]()
				} else {
					throw new Error('rule is not exists')
				}
			} else {
				// 不带冒号
				if (isSystemValidator(rule)) {
          validate = new Validator(value)[rule]()

					_validate = validate
				} else {
					throw new Error('rule is not exists')
				}
      }
			if (!validate) {
				_validate = validate
				errMsg = errorMsg
				break
			}
		} else if (isFunction(validator)) {
      // 自定义验证方法
      const validate = validator(value)
			if (!validate) {
        _validate = validate
				errMsg = errorMsg
				break
			}
		} else {
			throw new Error('rule or validator is not exists')
		}
	}
	return _validate
}

validatorForm.getError = function () {
	return errMsg
}

module.exports = validatorForm
