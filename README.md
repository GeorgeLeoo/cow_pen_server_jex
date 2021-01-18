
# app 文件夹
整个项目

# config 文件夹
配置文件

# model 文件夹
mongodb 的 model，采用mongoose的 schema

# main 文件说明

## 默认属性
- `prefix <string>``： 路由前缀
- `url <string>`： 路由
- `method <string>`： 请求方法，可选 get, post, patch, put, delete
- `requestParams <array>`： request 参数验证
- `db <object>`： 操作数据库配置
- `responseParams <array>`： 响应的参数
- `response <function({ response, ctx, next, model }) {}>`： 响应函数, 若业务复杂，内置配置无法满足您的需求，可以使用自定义方法
- `result <function(data) {}>`： 响应的结果, data 为返回的结果，使用该函数可对结果进行处理

## requestParams属性
- `value <string>`： 要验证的参数
- `errorMsg <string>`： 错误信息
- `rule <string>`： 内置规则
- `validator <function (val) {}>`： 自定义验证方法, val 为参数值， 返回 true：验证成功，false：验证失败，并返回 errorMsg

## db属性
- `collection <string>`：集合名称
- `type <string>`：操作类型，可选 find, insert, update, remove, login, logout, information
- `where <array>`：查询条件
- `data <array>`：要操作的数据
- `unique <array>`：唯一的字段，只能一个元素
- `populate <array｜object>`：mongoose 的 populate 用法
- `sort <object>`：排序，mongoose 的 sort 用法
- `group <object>`：分组查询，mongoose 的 $group 用法
