const ResponseCode =require('./../utils/ResponseCode')

module.exports = (ctx, next) => {
	return next().catch((err) => {
		if (err.status === ResponseCode.UN_AUTHORIZATION) {
			ctx.status = ResponseCode.UN_AUTHORIZATION
			ctx.body = err
		} else {
			ctx.status = err.status || ResponseCode.SERVICE_ERROR
			ctx.body = err
    }
    console.log(err);
	})
}
