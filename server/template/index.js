const normalTpl = require('./html')
const ejsTpl = require('./ejs')
const pugTpl = require('./pug')
module.exports = {
  htmlTpl: normalTpl,
  ejsTpl: ejsTpl,
  pugTpl: pugTpl
}