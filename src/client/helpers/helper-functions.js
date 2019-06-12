// helpers
import {tap} from 'rxjs/operators'
import {moviesContainer} from "./html-nodes"

export const getSelectedOptionValueFrom = options =>
  [...options].filter(option => option.selected).map(option => option.value)
export const $ = (name) => document.querySelector(`.${name}`)
export const $node = (name, node) => node.querySelector(`.${name}`)
export const $$ = name => [...document.querySelectorAll(`.${name}`)]
export const addPrefix = prefix => word => prefix + "-" + word
export const addSuffix = suffix => word => word + "-" + suffix

// nodes
export const initiallySelectedMovies = getSelectedOptionValueFrom(
  $$("movie-details-to-show-option")
)

export const editMovieNode = (movieNode, movie) =>
  Object.keys(movie).filter(prop => prop !== '__typename')
    .reduce((acc, propName) => ($node(propName, movieNode).innerText = movie[propName], movieNode), movieNode)


export const createMovieNode = (movie) => {
  const newMovieNode = document.createElement("div")
  newMovieNode.innerHTML = Object.keys(movie).filter(prop => prop !== '__typename').map(prop => `<div>${prop}: <span class='${prop}'></span></div>`).join("")
  return editMovieNode(newMovieNode, movie)
}

export const parseToCorrectTypes = movieObj => {
  const types = {
    title: String,
    newTitle: String,
    description: String,
    minAge: Number,
    prequel: String,
    sequel: String
  }
  return Object.entries(movieObj)
    .reduce((acc, [key, value]) => (console.log([key, value]), acc[key] = types[key](value), acc), {})
}

export const fillWithOptions = (selectNode, optnions) =>
  optnions.forEach(option => {
    const optionNode = document.createElement('option')
    optionNode.value = option
    optionNode.innerHTML = option
    selectNode.append(optionNode)
  })

export const log = () => tap(console.log)

export const addMoviesToNode = node => (movies, callback = x => x) => {
  node.innerHTML = ''
  movies.forEach(movie => {
    const movieNode = createMovieNode(movie);
    node.append(movieNode);
    callback(movie, movieNode)
  })}
