const activeMovies = (parent, args, context, info) => context.prisma.movies({
    where: {title_contains: args.title, isActive: true}
  })

const archivedMovies = (parent, args, context, info) => context.prisma.movies({
  where: {isActive: false}
})

const movies = (parent, args, context, info) => context.prisma.movies({
  where: {title_contains: args.title}
})

module.exports = {
  activeMovies,
  archivedMovies,
  movies
}
