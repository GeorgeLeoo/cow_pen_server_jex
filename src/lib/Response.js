'use strict'

class Response {
	constructor(ctx) {
		this.ctx = ctx
	}

	send(code, body) {
		if (this.ctx) {
			this.ctx.status = code
			this.ctx.body = body
		} else {
			throw new Error('send error')
		}
	}

	success(body) {
		this.send(Response.SUCCESS, body)
	}

	failClient(body) {
		this.send(Response.CLIENT_ERROR, body)
	}

	fail(body) {
		this.send(Response.CLIENT_ERROR, body)
	}

	failService(body) {
		this.send(Response.SERVICE_ERROR, body)
	}

	getResponse() {
		return this.ctx.response.body
	}
}

Response.SUCCESS = 200 //  请求成功
Response.FAIL = 900 //  获取数据失败
Response.UN_AUTHORIZATION = 401 // 客户端未授权、未登录
Response.CLIENT_ERROR = 406 //  客户端错误，未传递正确的参数
Response.SERVICE_ERROR = 501 //  服务器内部错误

module.exports = Response
