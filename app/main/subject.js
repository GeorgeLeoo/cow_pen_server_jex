/**
 * json，读json配置
 * requestParams：function
 * function，默认koa方法
 * db：function，array，json，
 *    为数组时，第一个数组元素结果会返回给第二个数组元素的结果
 * responseParams：function
 */
const subject = {
  prefix: 'subject',
  url: 'list',
  method: 'post',
	requestParams: [],
  db: {
    collection: 'Subject',
    type: 'find',
    where: [],
    data: ['name', 'admin','level'],
    unique: [],
    populate: ['admin'],
    sort: {},
    group: {},
  },
  responseParams: [],
  // response: ({ response, ctx, next, model }) => {
  //   console.log(ctx);
  //   response.success('okkk')
  // },
  // result: () => { return 'ok' }
}

module.exports = subject
