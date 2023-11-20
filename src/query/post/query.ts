import { gql } from '@apollo/client'

const POSTS_FIELDS = gql`
  fragment PostData on Post {
    author {
      image
      userName
      aboutUser
    }
    authorId
    comments {
      id
      content
      createdAt
      authorId
      postId
    }
    content
    createdAt
    id
    image
    likes {
      id
      userId
      postId
      createdAt
    }
    authorId
    subtitle
    title
    updatedAt
    popularity
  }
`

export const GET_POSTS_QUERY = gql`
  ${POSTS_FIELDS}
  query GetAllPosts($page: String, $sortOrder: String) {
    getPosts(page: $page, sortOrder: $sortOrder) {
      total
      posts {
        ...PostData
      }
    }
  }
`

export const GET_POST_QUERY = gql`
  ${POSTS_FIELDS}
  query GetPosts($id: ID!) {
    getPost(id: $id) {
      ...PostData
    }
  }
`

export const GET_POSTS_SEARCH_QUERY = gql`
  ${POSTS_FIELDS}
  query GetSearchPosts($search: String!) {
    getSearchPosts(search: $search) {
      total
      posts {
        ...PostData
      }
    }
  }
`

export const GET_RESENT_POSTS_QUERY = gql`
  query GetResentPosts($id: ID!) {
    getResentPosts(id: $id) {
      authorId
      content
      createdAt
      id
      image
      authorId
      subtitle
      title
      updatedAt
    }
  }
`

const UPDATE_POST_MUTATION = gql`
  ${POSTS_FIELDS}
  mutation UpdatePost($postInput: UpdatePostInput!, $image: File) {
    updatePost(input: $postInput, image: $image) {
      ...PostData
    }
  }
`

const CREATE_POST_MUTATION = gql`
  ${POSTS_FIELDS}
  mutation CreatePost($postInput: CreatePostInput!, $image: File) {
    createPost(input: $postInput, image: $image) {
      ...PostData
    }
  }
`

const DELETE_POST_MUTATION = gql`
  mutation DeletePosts($id: ID!) {
    deletePost(id: $id) {
      authorId
      content
      createdAt
      id
      image
      authorId
      subtitle
      title
      updatedAt
    }
  }
`
