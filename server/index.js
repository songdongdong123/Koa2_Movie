const Koa = require('koa');
const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init');
const router = require('./routes/index')

;(async () => {
  await connect() // 链接数据库
  initSchemas() //初始化数据模型
  require('./tasks/movie.js') // 将爬虫爬取到的数据导入数据库
})()

const app = new Koa();

app.use(router.routes()).use(router.allowedMethods());

app.use(views(resolve(__dirname, './views'), {
  extension: 'pug'
}))
// app.use(async (ctx, next) => {
//   await ctx.render('index', {
//     you: 'pig',
//     me: 'Ethan'
//   })
// })
app.listen(4455, () => {
  console.log('服务已启动1')
})