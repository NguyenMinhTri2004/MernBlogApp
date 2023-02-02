import { gql } from '@apollo/client';

const ADD_BLOG = gql`
  mutation AddBlog(
    $name: String!
    $description: String!
    $image : String!
  ) {
    addBlog(
      name: $name
      description: $description
      image : $image
    ) 
    {
      id
      name
      description
      user{
        id
        name
        email
  }
    }
  } 
`;

const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id) {
      id
    }
  }
`;

const UPDATE_BLOG = gql`
  mutation UpdateBlog(
    $id: ID!
    $name: String!
    $description: String!
    $image : String!
  ) {
    updateBlog(
      id: $id
      name: $name
      description: $description
      image : $image 
    ) {
      id
      name
      description
      user {
        id
        name
        email
      }
    }
  }
`;

export { ADD_BLOG ,  DELETE_BLOG , UPDATE_BLOG};