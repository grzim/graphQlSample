import {fromEvent, merge} from 'rxjs'
import {debounceTime, filter, flatMap, map, pluck, scan, withLatestFrom} from 'rxjs/operators'
import {
  addMovieButton,
  addMoviesFields,
  addMovieTitleInput,
  archivedMoviesContainer,
  archiveMovieBtn,
  editMoviesFields,
  editMovieTitleInput
} from "../html-nodes"
import {client, debounceTimeout} from "../conf"
import {parseToCorrectTypes} from "../helper-functions"
import {addMovieMutation, archiveMovieMutation, editMovieMutation, restoreMovieMutation} from "../gql/mutations"

export const editMovie$ = merge(...editMoviesFields
  .map(inputField => fromEvent(inputField, "blur")
    .pipe(
      filter(event => editMovieTitleInput.value && inputField.value),
      map(() => ({title: editMovieTitleInput.value, [inputField.getAttribute("name")]: inputField.value}))),
  ))
  .pipe(
    map(parseToCorrectTypes))

export const restoreMovie$ = fromEvent(archivedMoviesContainer, 'click')
  .pipe(
    map(event => event.target),
    filter(target => target.classList.contains('restore')),
    map(restoreButton => restoreButton.getAttribute('name')))

export const archiveMovie$ = fromEvent(archiveMovieBtn, "click").pipe(
  map(e => editMovieTitleInput.value))

export const addMoviePropertiesToFetch$ = merge(...addMoviesFields
  .map(inputField => (fromEvent(inputField, "keyup")
    .pipe(
      debounceTime(debounceTimeout),
      map(event => ({
        key: inputField.getAttribute("name"),
        value: inputField.value
      })),
      filter(({key, value}) => addMovieTitleInput.value && value)
    ))))
  .pipe(
    scan((acc, {key, value}) => (acc[key] = value, acc), {}),
    map(parseToCorrectTypes))

export const addMovie$ = fromEvent(addMovieButton, "click")
  .pipe(withLatestFrom(addMoviePropertiesToFetch$),
    map(([_, moviesProps]) => moviesProps))


