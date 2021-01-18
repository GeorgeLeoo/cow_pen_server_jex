const Admin = require('./User')
const Subject = require('./Subject')

// key 一定是字符串，不能简写，否则 build 之后无法识别模块
module.exports = {
  'Admin': Admin,
  'Subject': Subject
}