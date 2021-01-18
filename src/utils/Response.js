const ResponseCode = require('./../utils/ResponseCode')

class Response {
	constructor(ctx) {
		this.ctx = ctx
	}

	send(code = ResponseCode.SUCCESS, msg = '', data = []) {
		let body = {
			code,
			msg,
			data,
		}
		this.ctx.status = code
		this.ctx.body = body
	}
}

module.exports = Response
