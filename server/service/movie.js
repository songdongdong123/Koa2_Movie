const mongoose = require('mongoose')
const Movie = mongoose.model('Movie')
export const getAllMovies = async (type, year) => {
  let query = {}
  if (type) {
    query.movieTypes = {
      $in: [type]
    }
  }

  if (year) {
    query.year = year
  }

  const movies = await Movie.find(query)
  return movies
}

export const getMovieDetail = async (id) => {
  const movie = await Movie.findOne({_id: id})
  return movie
}