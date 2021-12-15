import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import connectDB from '../../../mongo/config/index'
import Users from '../../../mongo/models/user'
import bcrypt from 'bcrypt'

connectDB()
export default NextAuth({
  session: {
    jwt: true,
  },

  providers: [
    Providers.Credentials({
      name: 'Credentials',
      async authorize(credentials) {
        const email = credentials.email
        const password = credentials.password
        const username = credentials.username
        console.log('HELLOOW ', credentials)

        if (credentials.action === 'login')
          return loginUser({ password, email })
        if (credentials.action === 'register')
          return registerUser({ email, password, username })

        // return registerUser({ email, password })
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  // SQL or MongoDB database (or leave empty)
  //   database: process.env.DATABASE_URL,
  callbacks: {
    session: async (session, user) => {
      // const resUser = await Users.findById(user.sub)
      // session.emailVerified = resUser.emailVerified
      session.userId = user.sub
      return Promise.resolve(session)
    },
  },
})

const loginUser = async ({ password, email }) => {
  const user = await Users.findOne({ email })
  if (!user) {
    throw new Error('User Does Not Exist')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid Email or Password.')
  }

  // if (!user.emailVerified) {
  //   throw new Error('LOGEDMIN BUT Success! Check your email.')
  // }

  return user
}

const registerUser = async ({ email, password, username }) => {
  const user = await Users.findOne({ email })
  if (user) {
    throw new Error('User Allready Exist')
  }
  const hashPass = await bcrypt.hash(password, 12)
  const newUser = await new Users({
    email,
    password: hashPass,
    username: username ? username : email.split('@')[0],
  })
  await newUser.save()
  return newUser
}
