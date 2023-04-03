const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        name: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    input Book_Input {
        bookId: ID!
        authors: [String]
        description: String
        title: String!
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]!
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth

        saveBook(book: Book_Input!): User
        removeBook(bookId: ID!): User
    }
`;

module.exports = typeDefs;