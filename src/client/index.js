import {
  archivedMoviesContainer,
  addedMovieContainer,
  addMoviesFields,
  inputsWithMovieNames,
  moviesContainer,
  editMovieTitleInput, editMoviesFields
} from "./helpers/html-nodes"
import {addMoviesToNode, createMovieNode, fillWithOptions, log} from "./helpers/helper-functions"

import {
  archivedMovies$,
  MoviesTitles$,
  activeMovies$,
  archivedMovie$,
  addedMovie$,
  editedMovie$,
  restoredMovie$
} from "./helpers/streams/serverResponses"
import {movieDetailsToShow$} from "./helpers/streams/queryStreams"

// query
movieDetailsToShow$.subscribe(selectedOptionsArr => { // reaction for message after transformation
  console.log(selectedOptionsArr)
})

MoviesTitles$
  .subscribe(moviesTitles => {
    inputsWithMovieNames.forEach(input => fillWithOptions(input, ['', ...moviesTitles]));
  })

archivedMovies$.subscribe(movies =>{
  addMoviesToNode(archivedMoviesContainer)(movies, (movie, movieNode) => {
      const button = document.createElement('button');
      button.classList.add('restore');
      button.setAttribute('name', movie.title);
      button.innerText = 'restore';
      movieNode.append(button)
    }
  )})

// mutations
addedMovie$.subscribe(movie => {
  addedMovieContainer.innerHTML = '';
  addedMovieContainer.appendChild(createMovieNode(movie));
  addMoviesFields.forEach(node => node.value = '')
});

activeMovies$.pipe(log()).subscribe(addMoviesToNode(moviesContainer))
archivedMovies$.subscribe(movie => {
  editMoviesFields.forEach(field => field.value = '')
})

editedMovie$.subscribe();
restoredMovie$.subscribe()

// Subscriptions
