module.exports = {
	username: {
		type: String,
		unique: true,
	},
	name: String,
	password: String,
	gender: Number,
	avatar: String,
	phone: String,
	state: {
		type: Number,
		default: 0,
	},
	/**
	 * 数据状态
	 * 1 表示存在
	 * -1 表示删除
	 * 默认 0
	 */
	isDelete: {
		type: Number,
		default: 1,
	},
	/**
	 * 创建时间
	 */
	createdAt: {
		type: Date,
		default: new Date(),
	},
}