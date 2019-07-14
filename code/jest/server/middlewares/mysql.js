module.exports = async (ctx, next) => {
    ctx.db = db

    await next()
}