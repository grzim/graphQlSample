import {from, fromEvent, merge} from "rxjs"
import {
  addMovieButton,
  addMoviesFields,
  addMovieTitleInput,
  archivedMoviesContainer,
  archiveMovieBtn,
  editMovieTitleInput
} from "../html-nodes"
import {
  combineAll,
  combineLatest,
  debounceTime,
  filter,
  first,
  flatMap,
  map, mapTo,
  pluck,
  scan, share,
  startWith,
  withLatestFrom
} from "rxjs/operators"
import {client, debounceTimeout} from "../conf"
import {addMovieMutation, archiveMovieMutation, editMovieMutation, restoreMovieMutation} from "../gql/mutations"
import {log, parseToCorrectTypes} from "../helper-functions"
import {archivedMoviesQuery, createMovieQuery} from "../gql/queries"
import {getActiveMovies$, movieDetailsToShow$} from "./queryStreams"
import {restoreMovie$, archiveMovie$, addMovie$, editMovie$} from "./mutationStreams"

export const restoredMovie$ = restoreMovie$.pipe(
  flatMap(title => client.mutate({mutation: restoreMovieMutation, variables: {title}})),
  share())

export const archivedMovie$ = archiveMovie$.pipe(
  flatMap(title => client.mutate({mutation: archiveMovieMutation, variables: {title}})),
  share())

export const editedMovie$ = editMovie$.pipe(
  flatMap(variables => client.mutate({mutation: editMovieMutation, variables: {...variables}})),
  pluck('data', 'editMovie'),
  share())

export const addedMovie$ = addMovie$
  .pipe(
    flatMap((movieProps) => client.mutate({mutation: addMovieMutation, variables: {...movieProps}})),
    pluck('data', 'addMovie'),
    share())

export const archivedMovies$ = archivedMovie$.pipe(
  startWith(''),
  flatMap(x => client.query({query: archivedMoviesQuery})),
  pluck('data', 'archivedMovies'),
  share())


export const activeMovies$ = merge(getActiveMovies$.pipe(
  combineLatest(movieDetailsToShow$),
  map(([searchQuery = '', movieDetailsToShow]) => ({searchQuery, movieDetailsToShow})),
  filter(({movieDetailsToShow}) => movieDetailsToShow.length),
  flatMap(({searchQuery, movieDetailsToShow}) => client.query({
    query: createMovieQuery(movieDetailsToShow),
    variables: {title: searchQuery}
  })),
  pluck('data', 'activeMovies')), addedMovie$).pipe(
  log(),
  share())

export const MoviesTitles$ =
  activeMovies$.pipe(
    map((movies) => movies.map(m => m.title)));
