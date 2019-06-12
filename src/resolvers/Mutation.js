const removePropertiesWithEmptyValues = obj =>
  Object
    .entries(obj)
    .filter(([key, value]) => value)
    .reduce((acc, [key, value]) => ({...acc, [key]: value}), {})

const findMovieByTitle = args => ({
  where: {title: args.title}
});

const archiveMovie =  async (parent, args, context, info) =>
  (context.prisma.updateMovie({data: {isActive: false}, where: {title: args.title}}),
    context.prisma.movies())



const restoreMovie =  async (parent, args, context, info) => (
  context.prisma.updateMovie({data: {isActive: true}, where: {title: args.title}}),
    context.prisma.movies())


const addMovie = async (parent, args, context, info) => (
  context.prisma.createMovie({
    title: args.title,
    description: args.description,
    minAge: args.minAge,
    isActive: true
  }), context.prisma.movies({where: {isActive: true}}))

const editMovie = (parent, args, context, info) => (context.prisma.updateMovie({data: removePropertiesWithEmptyValues({
    title: args.newTitle,
    description: args.description,
    minAge: args.minAge
  }),
  where: {title: args.title}}),
  context.prisma.movies({where: {isActive: true}}))


module.exports = {
  addMovie,
  editMovie,
  archiveMovie,
  restoreMovie
}
