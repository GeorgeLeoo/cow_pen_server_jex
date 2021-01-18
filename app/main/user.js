module.exports = {
	prefix: 'user',
	url: 'get-login',
	method: 'post',
	// request参数验证
	requestParams: [
		{ value: 'username', errorMsg: '用户名不能为空', rule: 'empty' },
		{ value: 'password', errorMsg: '密码不能为空', rule: 'empty' },
	],
	/**
	 * type: [find, insert, update, remove, login, logout, information]
	 */
	db: {
		collection: 'Admin',
		type: 'information',
		where: [],
		data: [],
		unique: [],
		populate: [],
		sort: {},
		group: {},
	},
	responseParams: ['username'],
}

