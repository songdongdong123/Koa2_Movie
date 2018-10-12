const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Mixed = Schema.Types.Mixed

const movieSchema = new Schema({
  doubanId: String,
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

movieSchema.pre('save', next => {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now
  } else {
    this.meta.updatedAt = Date.now
  }
  next()
})

mongoose.model('Movie', movieSchema)