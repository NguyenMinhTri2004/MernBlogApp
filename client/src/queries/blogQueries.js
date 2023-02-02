import { gql } from '@apollo/client';

const GET_BLOGS = gql`
  query getBlogs {
    blogs {
      id
      name
      image
      description
    }
  }
`;

const GET_BLOG = gql`
  query getBlog($id: ID!) {
    blog(id: $id) {
      id
      name
      description
      image
      user {
        id
        name
        email
      }
    }
  }
`;

export { GET_BLOGS, GET_BLOG };