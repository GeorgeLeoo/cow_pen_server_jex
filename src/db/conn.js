const mongoose = require('mongoose')
const Utils = require('../utils/Utils')
const config = Utils.getConfig()
const validatorForm = require('../utils/validatorForm')

function getURL() {
  let {host, port, username, password, db, authSource} = config.MONGO
  const rules = [
    { value: host, errorMsg: 'MONGO host 不能为空', rule: 'empty' },
    { value: username, errorMsg: 'MONGO username 不能为空', rule: 'empty' },
    { value: password, errorMsg: 'MONGO password 不能为空', rule: 'empty' },
    { value: db, errorMsg: 'MONGO db 不能为空', rule: 'empty' },
    { value: authSource, errorMsg: 'MONGO authSource 不能为空', rule: 'empty' },
  ]

  const validator = validatorForm(rules)

  if (!validator) {
    throw new Error(validatorForm.getError())
  }

  if (port) {
    host = `${host}:${port}`
  }
  return `mongodb://${username}:${password}@${host}/${db}?authSource=${authSource}`
}

const URL = getURL()

/**
 * 连接
 */
mongoose.connect(URL, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})
// sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=Loveyou," -p 1433:1433 --name sql1 -d mcr.microsoft.com/mssql/server:2017-latest
/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {
	console.log('Mongoose connection open to ' + URL)
})

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
	console.log('Mongoose connection error: ' + err)
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
	console.log('Mongoose connection disconnected')
})

module.exports = mongoose
