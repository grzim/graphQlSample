import {gql} from 'apollo-boost'
import {movieDetails} from "../conf"


export const archiveMovieSubscription = gql`
  subscription archiveMovieSubscribe {
    ${movieDetails}
  }
`

export const newActiveMovieSubscription = gql`
  subscription newActiveMovie {
    ${movieDetails}
  }
`

export const restoredMovieSubscription = gql`
  subscription restoredMovieSubscribe {
    ${movieDetails}
  }
`

export const editedMovieSubscription = gql`
  subscription editedMovieSubscribe {
    ${movieDetails}
  }
`
