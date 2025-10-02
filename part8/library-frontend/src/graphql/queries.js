import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
    query GetAllAuthors {
        allAuthors {
            name
            born
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query GetAllBooks {
        allBooks {
            title
            author
            published
        }
    }
`

export const ADD_BOOK = gql`
    mutation AddBook(
        $title: String!
        $published: Int!
        $author: String!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            published: $published
            author: $author
            genres: $genres
        ) {
            title
            author
            published
            genres
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation EditAuthor($name: String!, $setBornTo: Int!){
        editAuthor(name: $name, setBornTo: $setBornTo){
            name
            born
        }
    }
`