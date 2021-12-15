import { gql } from 'apollo-server-micro'

const typeDefs = gql`
  # Products

  type Entry {
    id: ID
    tittle: String!
    description: String!
    diaryid: Diary
    author: User
  }

  type Diary {
    id: ID
    tittle: String!
    entries: [Entry]
    privacy: String!
    author: User
    createdAt: String
  }

  type User {
    _id: ID!
    username: String
    email: String
    image: String
    diaries: [Diary]
    password: String
    createdAt: String
    updatedAt: String
  }
  type Product {
    id: ID
    name: String
    productionCapacity: Int
    price: Float
    description: String
  }

  input ProductInput {
    name: String!
    productionCapacity: Int!
    price: Float!
    description: String
  }

  type Query {
    getProducts: [Product]
    getDiaries: [Diary!]
    getEntries: [Entry!]
    getDiary(id: ID!): Diary!
    getEntry(id: ID!): Entry!
    getProduct(id: ID!): Product
    allUsers: [User!]
    currentuser(id: ID!): User!
  }

  type Mutation {
    #Products
    newProduct(input: ProductInput): Product
    newDiary(tittle: String!, privacy: String!, author: ID!): Diary
    newEntry(
      tittle: String!
      description: String!
      diaryid: ID!
      author: ID!
    ): Entry
    updateEntry(tittle: String!, description: String!, id: ID!): Entry
    deleteDiary(id: ID!): String
    deleteEntry(id: ID!): String

    #Users
    profile(token: String!): User!
  }
`

module.exports = typeDefs
