import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation AddUser(
    $email: String!
    $password: String!
    
  ) {
    addUser(email: $email , password: $password) 
    {
      id
      password
    }
  } 
`;


const LOGIN = gql`
  mutation Login (
    $email: String!
    $password: String!
    
  ) {
    login(email: $email , password: $password) 
    {
      id
    }
  } 
`;



export {ADD_USER , LOGIN};