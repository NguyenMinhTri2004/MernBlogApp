import { gql } from '@apollo/client';

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      email
    }
  }
`;

export {GET_USER};
