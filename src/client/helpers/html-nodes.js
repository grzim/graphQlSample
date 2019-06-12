import {$, addPrefix, addSuffix} from "./helper-functions"

const movieNodesNames = ["title", "description", "min-age", "prequel", "sequel"].map(addSuffix("input")).map(addPrefix("movie"))

export const [
  addedMovieContainer,
  addMovieButton,
  moviesContainer,
  archivedMoviesContainer,
  movieDetailsToShowInput,
  searchInput,
  archiveMovieBtn] = [
    "added-movie-container",
    "movie-add",
    "movies-container",
    "archived-movies-container",
    "movie-details-to-show-input",
    "search-input",
    "movie-archive-btn"].map($);

export const editMoviesFields =  [...movieNodesNames.map(addPrefix("edit-new"))].map($)

export const [
  editMovieTitleInput,
  editMovieDescriptionInput,
  editMovieMinAgeInput,
  editMoviePrequelInput,
  editMovieSequelInput] = editMoviesFields;

export const addMoviesFields =  [...movieNodesNames.map(addPrefix("add"))].map($);

export const [addMovieTitleInput,
  addMovieDescriptionToShowInput,
  addMovieMinAgeInput,
  addMoviePrequelInput,
  addMovieSequelInput,
] = addMoviesFields;

export const inputsWithMovieNames = [
    editMovieTitleInput,
    editMoviePrequelInput,
    editMovieSequelInput,
    addMoviePrequelInput,
    addMovieSequelInput,
  ];
