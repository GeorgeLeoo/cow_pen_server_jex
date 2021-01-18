const Utils = require('./../utils/Utils')
const config = Utils.getConfig()

module.exports = async (ctx, next) => {
	const token = ctx.get('authorization')
	if (ctx.get('server') === 'true') {
		return next()
	} else if (config.UN_AUTHENTICATION_API.includes(ctx.originalUrl)) {
		return next()
	} else {
		const res = await Utils.verifyToken(token.split(' ')[1])
		return next()
	}
}
