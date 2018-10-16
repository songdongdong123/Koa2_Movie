const env = process.env.NODE_ENV === 'production'? 'prod' : 'env'
module.exports = require(`./${env}.js`)