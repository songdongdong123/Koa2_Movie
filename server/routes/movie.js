
const { getAllMovies, getMovieDetail } = require('../service/movie')
const { controller, get } = require('../lib/decorator')

@controller('/api/v0/movies')
export class movieController {
  @get('/')
  async getMovies (ctx, next) {
    const { type, year } = ctx.query
    const movies = await getAllMovies(type, year)
    ctx.body = {
      movies
    }
  }

  @get('/:id')
  async getMovieDetail (ctx, next) {
    const id = ctx.params.id
    const movie = await getMovieDetail(id)
    ctx.body = {
      data: {
        movie
      },
      success: true
    }
  }
}