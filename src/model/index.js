const db = require('./../db/conn')
const Schema = db.Schema
const { isFunction } = require("../utils/dataType")
const utils = require('./../../config/utils')

const path = require('path')

const modelPath = path.join(utils.APP_PATH, 'model/index.js')

// const models = require('./../../app/model')
const models = require(modelPath)

const model = {}

for (const key in models) {
  const _model = models[key]
  
  if (isFunction(_model)) {
    model[key] = db.model(key, new Schema(models[key](Schema)))
  } else {
    model[key] = db.model(key, new Schema(models[key]))
  }
}

module.exports = model