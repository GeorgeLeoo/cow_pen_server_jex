const combineRoutes = require('koa-combine-routers')

const Router = require('./router')

module.exports = combineRoutes(
  Router,
)
