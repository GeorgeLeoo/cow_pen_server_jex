const path = require('path')
const Koa = require('koa')
const compose = require('koa-compose')
const koaBody = require('koa-body')
const json = require('koa-json')
const cors = require('@koa/cors')
const helmet = require('koa-helmet')
const statics = require('koa-static')
const compress = require('koa-compress')
const JWT = require('koa-jwt')

const router = require('./routes')
const errorHandle = require('./common/ErrorHandle')
const TokenVerifyHandle = require('./common/TokenVerifyHandle.js')

const Utils = require('./utils/Utils')

// const models = require('./../../app/model')
const config = Utils.getConfig()

class App {
	constructor() {

		this.config = config

		this.PORT = 7001

		this.app = new Koa()

		const isDevMode = process.env.NODE_ENV !== 'production'

		const jwt = JWT({ secret: config.JWT_SECRET }).unless({
			path: config.UN_AUTHENTICATION_API,
		})

		// koa-compose 集成中间件
		const middleware = compose([
			koaBody({
				multipart: true,
				formidable: {
					keepExtensions: true,
					maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
				},
			}),
			statics(path.join(__dirname, '../public')),
			cors(),
			json({ pretty: false, param: 'pretty' }),
			helmet(),
			TokenVerifyHandle,
			// jwt,
			errorHandle,
			router(),
		])

		if (isDevMode) {
			this.app.use(compress())
		}

		this.app.use(middleware)

		this.app.listen(this.PORT, () => {
			console.log('Server is listening on http://localhost:7001');
		})
		// console.log(this);
	}
}

new App()
