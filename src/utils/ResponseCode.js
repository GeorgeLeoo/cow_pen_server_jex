class ResponseCode {}

ResponseCode.SUCCESS = 200 //  请求成功
ResponseCode.FAIL = 900 //  获取数据失败
ResponseCode.UN_AUTHORIZATION = 401 // 客户端未授权、未登录
ResponseCode.CLIENT_ERROR = 406 //  客户端错误，未传递正确的参数
ResponseCode.SERVICE_ERROR = 500 //  服务器内部错误

module.exports = ResponseCode
