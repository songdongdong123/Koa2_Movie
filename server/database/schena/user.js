const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_TIMES = 5
const LOCK_TIME = 2 * 60 * 60 * 1000

const userSchema = new Schema({
  username: {
    unique: true,
    required: true,
    type: String
  },
  email: {
    unique: true,
    required: true,
    type: String
  },
  password: {
    unique: true,
    type: String
  },
  lockUntil: Number,
  loginAttempts: {
    type: Number,
    required: true,
    default: 0
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  }
})

//增加虚拟字段（）虚拟字段并不会每次都网数据库中更新
userSchema.virtual('isLocked').get(() => {
  return !!this.lockUntil && this.lockUntil > Date.now
})

// 中间件
userSchema.pre('save', next => {
  // 判断是不是新增的数据
  if (this.isNew) {
    // 如果是就将createdAt和updatedAt设置为当前时间戳
    this.meta.createdAt = this.meta.updatedAt = Date.now
  } else {
    // 如果不是新增的数据，那就是只更新updatedAt的时间戳
    this.meta.updatedAt = Date.now
  }
  next()
})
userSchema.pre('save', next => {
  // 实现密码的中间件，主要作用是增加密码的复杂度
  // isModified是mongoose提供的一个判断字段是否被改动的方法
  if (!user.isModified(password)) return next()
  // bcrypt是一个密码库
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next()
    // bcrypt.hash用来产生一段hash值
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (err) return next(error)
      this.password = hash
      next()
    })
  })
  next()
})

// 给userSchema上挂载实例方法
userSchema.methods = {
  // 对用户传递过来的明文密码和数据库加密后的密码进行比对
  comparePassword: (_password, password) => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) resolve(isMatch)
        else reject(err)
      })
    })
  },
  incLoginAttepts: (user) => {
    return new Promise((resolve, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now) {
        this.update({
          $set: {
            loginAttempts: 1
          },
          $unset: {
            lockUntil: 1
          }
        }, (err) => {
          if (!err) resolve(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttempts: 1
          }
        }
        if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
          updates.$set = {
            lockUntil: Date.now + LOCK_TIME
          }
        }
        this.update(updates, err => {
          if (!err) resolve(true)
          else reject(err)
        })
      }
    })
  }
}

mongoose.model('User', userSchema)