const mongoose = require('mongoose')
mongoose.Promise = global.Promise
const db = 'mongodb://localhost/my_database'
const glob = require('glob')
const { resolve } = require('path')
exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}
exports.connect = () => {
  let maxConnectTimes = 0
  return new Promise((resolve, reject) => {
    if(process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true)
    }
    mongoose.connect(db, { useNewUrlParser: true }) // 链接数据库
    // 下面监听数据库链接状态
    mongoose.connection.on('disconnected', () => { 
      // 数据库尚未链接
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        throw new Error('数据库挂了1')
      }
    })
    mongoose.connection.on('error', () => {
      // 数据库链接错误
      maxConnectTimes++
      if (maxConnectTimes < 5) {
        mongoose.connect(db, { useNewUrlParser: true })
      } else {
        throw new Error('数据库挂了2')
      }
    })
    mongoose.connection.once('open', () => {
      const Cat = mongoose.model('Cat', { name: String });
      const kitty = new Cat({ name: 'ethan' });
      kitty.save().then(() => console.log('meow'));
      resolve()
      console.log('MongoDB Connected successfully')
    })
  })
}