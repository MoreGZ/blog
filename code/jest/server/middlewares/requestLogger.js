module.exports = async (ctx, next) => {
    const request = ctx.request
    const response = ctx.response
    let method = request.method.toUpperCase()
	logger.info({
        event: 'request',
        path: request.path,
		url: request.originalUrl,
		method,
		contentType: request.get('Content-Type'),
        body: method === 'POST' ? request.body : void(0),
        referer: request.headers.referer,
    })

    await next()

    logger.info({
        event: 'response',
        header: response.header,
        status: response.status,
        message: response.response,
        body: response.body
    })
}