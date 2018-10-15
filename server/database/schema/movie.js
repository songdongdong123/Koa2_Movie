const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId,Mixed} = Schema.Types

const movieSchema = new Schema({
  doubanId: {
    unique: true,
    type: String
  },
  category: {
    type: ObjectId,
    ref: 'Catgory'
  },
  rate: Number,
  title: String,
  summery: String,
  video: String,
  poster: String,
  cover: String,
  rawTitle: String,
  movieTypes: [String],
  pubdate: Mixed,
  year: Number,
  tags: Array,
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

movieSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now
  } else {
    this.meta.updatedAt = Date.now
  }
  next()
})

mongoose.model('Movie', movieSchema)