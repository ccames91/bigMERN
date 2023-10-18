const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Book {
  _id: ID
  title: String
  author: String
  description: String
  image: String
  link: String
}

type User {
  _id: ID
  username: String
  email: String
  savedBooks: [Book]
}

type Query {
  books: [Book] # Corresponds to getting a list of books
  me: User # Corresponds to getting the logged-in user
}

type Mutation {
  login(email: String!, password: String!): Auth # Corresponds to user login
  addUser(username: String!, email: String!, password: String!): Auth # Corresponds to user signup
  saveBook(title: String!, author:String!, description:String!, image:String!, link:String!): User # Corresponds to saving a book
  removeBook(bookId: ID!): User # Corresponds to removing a book
}

`

module.exports = typeDefs;
