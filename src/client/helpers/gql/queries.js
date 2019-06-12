import {gql} from 'apollo-boost'
import {movieDetails} from "../conf"

export const createMovieQuery = (propertiesToGet) =>
gql`
  query ($title: String!) {
    activeMovies(title:$title) {
      title
      description
      minAge
      }    
  }
`

export const MoviesQuery = gql`
  query {
    movies {
        ${movieDetails}
    }
  }
`

export const archivedMoviesQuery = gql`
  query {
    archivedMovies {
      ${movieDetails}
    }
  }
`
