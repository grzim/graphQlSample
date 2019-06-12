import {gql} from 'apollo-boost'
import {movieDetails} from "../conf"

export const archiveMovieMutation = gql`
  mutation ($title: String!) {
    archiveMovie (title: $title) {
      ${movieDetails}
    }
  }
`


export const editMovieMutation = gql`
  mutation ($title: String! $minAge: Int $description: String, $newTitle: String) {
    editMovie (title: $title, newTitle: $newTitle, minAge:$minAge  description: $description) {
      ${movieDetails}
    }
  }
`

export const addMovieMutation = gql`
  mutation ($title: String! $minAge: Int $description: String) {
    addMovie (title: $title, minAge:$minAge  description: $description) {
      ${movieDetails}
    }
  }
`

export const restoreMovieMutation = gql`
  mutation ($title: String!) {
    restoreMovie (title: $title) {
      ${movieDetails}
    }
  }
`

