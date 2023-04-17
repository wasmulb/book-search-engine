import {gql} from '@apollo/client';

// export const GET_ME = gql`
// query me {
//     user {
//     _id
//     name
//     email
//     bookCount
//     savedBooks
//     }
// }
// `;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
  `;
