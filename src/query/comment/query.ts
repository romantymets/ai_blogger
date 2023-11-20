import { gql } from '@apollo/client'

const CREATE_COMMENT_MUTATION = gql`
  mutation CreateComment($input: CreateCommentInput!) {
    createComment(input: $input) {
      updatedAt
      authorId
      createdAt
      content
      postId
    }
  }
`

const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      authorId
      content
      createdAt
      id
      authorId
      updatedAt
    }
  }
`

export const GET_COMMENTS_BY_POST_QUERY = gql`
  query GetCommentsByPost($id: ID!) {
    getCommentsByPost(id: $id) {
      authorId
      content
      createdAt
      id
      authorId
      updatedAt
      author {
        image
        userName
        aboutUser
      }
    }
  }
`
