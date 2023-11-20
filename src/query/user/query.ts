import { gql } from '@apollo/client'

const GET_USER_QUERY = gql`
  query GetUser($userId: String!) {
    getUser(id: $userId) {
      email
      userId
      userName
      image
      aboutUser
    }
  }
`

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(id: $userId) {
      email
      id
      userName
      image
      aboutUser
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser(
    $userId: String!
    $userInput: UpdateUserInput!
    $image: File
  ) {
    updateUser(id: $userId, image: $image, input: $userInput) {
      userName
      userId
      image
      email
      aboutUser
    }
  }
`

export const GET_USERS_QUERY = gql`
  query getAllUsers {
    getAllUsers {
      email
      aboutUser
      id
    }
  }
`

const REGISTRATION_MUTATION = gql`
  mutation Registration($userInput: RegistrationInput!, $image: File) {
    registration(input: $userInput, image: $image) {
      userName
      userId
      image
      email
      aboutUser
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userName
      userId
      image
      email
      aboutUser
    }
  }
`

const RESET_PASSWORD_MUTATION = gql`
  mutation ResetPassword(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    resetPassword(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      userName
      userId
      image
      email
      aboutUser
    }
  }
`

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      success
    }
  }
`
