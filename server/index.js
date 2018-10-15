const Koa = require('koa');
// const views = require('koa-views')
const { resolve } = require('path')
const { connect, initSchemas } = require('./database/init');
const R = require('ramda')
const MIDDLEWARES = ['router']

const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewares/${name}`)
    )
  )(MIDDLEWARES)
}

;(async () => {
  await connect() // 链接数据库
  initSchemas() //初始化数据模型
  // require('./tasks/movie.js') // 将爬虫爬取到的数据导入数据库
  const app = new Koa();
  await useMiddlewares(app);
  app.listen(4455, () => {
    console.log('服务已启动1')
  })
})();