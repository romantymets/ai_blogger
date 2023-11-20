import { gql } from '@apollo/client'

const CREATE_FAVORITE_MUTATION = gql`
  mutation CreateFavorite($postId: ID!, $userId: ID!) {
    createFavorite(userId: $userId, postId: $postId) {
      updatedAt
      userId
      createdAt
      id
      postId
    }
  }
`

const DELETE_FAVORITE_MUTATION = gql`
  mutation DeleteFavorite($id: ID!) {
    deleteFavorite(id: $id) {
      userId
      createdAt
      id
      postId
      updatedAt
    }
  }
`
