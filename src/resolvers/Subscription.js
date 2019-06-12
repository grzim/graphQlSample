function archiveMovieSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.movie({
    mutation_in: ['UPDATED'],
    updatedFields: 'isActive',
    node: {
      isActive: false,
    }
  }).node()
}

function newActiveMovieSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.movie({mutation_in: ['CREATED']}).node()
}

function restoredMovieSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.movie({
    mutation_in: ['UPDATED'],
    updatedFields: 'isActive',
    node: {
      isActive: true,
    }
  }).node()
}

function editedMovieSubscribe(parent, args, context, info) {
  return context.prisma.$subscribe.movie({
    mutation_in: ['UPDATED'],
    updatedFields_contains_some: ['title', 'description', 'minAge', 'prequel', 'sequel']
  }).node()
}
const archiveMovie = {
  subscribe: archiveMovieSubscribe,
  resolve: payload => {
    return payload
  },
}
const newActiveMovie = {
  subscribe: newActiveMovieSubscribe,
  resolve: payload => {
    return payload
  },
}
const restoredMovie = {
  subscribe: restoredMovieSubscribe,
  resolve: payload => {
    return payload
  },
}
const editedMovie = {
  subscribe: editedMovieSubscribe,
  resolve: payload => {
    return payload
  },
}
module.exports = {
  archiveMovie, newActiveMovie, restoredMovie, editedMovie
}
