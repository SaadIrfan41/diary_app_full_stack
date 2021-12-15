// const shortid = require('shortid')
import Users from '../../models/user'

module.exports = {
  Query: {
    async currentuser(parent, { id }, { req }) {
      if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new Error('Invalid User ID')
      }

      const user = await Users.findById(id).exec()
      if (!user) {
        throw new Error('User Does Not Exist')
      }
      return user
    },
    async allUsers(parent, args) {
      return await Users.find({}).exec()
    },
  },

  Mutation: {
    async profile(parent, { token }, { req }) {
      const currentUser = await authCheck(token)
      const user = await Users.findOne({ email: currentUser.email }).exec()
      if (!user) {
        throw new Error('User Does Not Exist')
      }
      return user
    },
  },
}
