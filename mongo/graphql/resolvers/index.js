const usersResolvers = require('./users')
const diariesResolvers = require('./diaries')

const entriesResolvers = require('./entries')

module.exports = {
  Query: {
    ...usersResolvers.Query,
    ...diariesResolvers.Query,
    ...entriesResolvers.Query,
  },

  Mutation: {
    ...usersResolvers.Mutation,
    ...diariesResolvers.Mutation,
    ...entriesResolvers.Mutation,
  },
}
