const Koa = require('koa');
const app = new Koa();
const { htmlTpl, ejsTpl, pugTpl } = require('./template');
// const ejs = require('ejs');
const pug = require('pug');
app.use(async (ctx, next) => {
  ctx.type = 'text/html; charset=utf-8'
  // ctx.body = ejs.render(ejsTpl, {
  //   you: '宋冬冬',
  //   me: '东西系'
  // })
  ctx.body = pug.render(pugTpl, {
    you: '宋冬冬',
    me: '过江龙'
  })
})
app.listen(4455, () => {
  console.log('服务已启动')
})