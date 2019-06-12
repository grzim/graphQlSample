import {from, fromEvent} from 'rxjs'
import {combineLatest, debounceTime, filter, first, flatMap, map, pluck, startWith} from 'rxjs/operators'
import {movieDetailsToShowInput, searchInput} from "../html-nodes"
import {client, debounceTimeout} from "../conf"
import {getSelectedOptionValueFrom, initiallySelectedMovies} from "../helper-functions"
import {archivedMoviesQuery, createMovieQuery} from "../gql/queries"


export const movieDetailsToShow$ = fromEvent(movieDetailsToShowInput, "change").pipe(
  pluck("srcElement", "options"), // get property, nested property
  map(getSelectedOptionValueFrom), // map with provided function
  startWith(initiallySelectedMovies) // start with the provided value before any message comes
)

export const searchQuery$ = fromEvent(searchInput, "keyup").pipe(
  debounceTime(debounceTimeout), // wait for provided time after last message is emitted
  map(() => searchInput.value) // map with provided function
)

export const getActiveMovies$ = searchQuery$.pipe(
  startWith(''))


