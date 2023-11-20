import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  File: { input: any; output: any; }
};

export type AuthorPayload = {
  __typename?: 'AuthorPayload';
  aboutUser?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  userName?: Maybe<Scalars['String']['output']>;
};

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  authorId?: Maybe<Scalars['ID']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  post?: Maybe<Post>;
  postId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CommentPayload = {
  __typename?: 'CommentPayload';
  authorId?: Maybe<Scalars['ID']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  postId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CommentsByPost = {
  __typename?: 'CommentsByPost';
  author?: Maybe<AuthorPayload>;
  authorId?: Maybe<Scalars['ID']['output']>;
  content?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  postId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
};

export type CreateCommentInput = {
  authorId: Scalars['ID']['input'];
  comment: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};

export type CreatePostInput = {
  content: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type FavoritePostByUser = {
  __typename?: 'FavoritePostByUser';
  createdAt?: Maybe<Scalars['Date']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  postId?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userId?: Maybe<Scalars['ID']['output']>;
};

export type Logout = {
  __typename?: 'Logout';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CommentPayload;
  createFavorite: FavoritePostByUser;
  createPost: Post;
  deleteComment: CommentPayload;
  deleteFavorite: FavoritePostByUser;
  deletePost: Post;
  deleteUser: User;
  login?: Maybe<UserPayload>;
  logout?: Maybe<Logout>;
  registration?: Maybe<UserPayload>;
  resetPassword?: Maybe<UserPayload>;
  updatePost: Post;
  updateUser: UserPayload;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateFavoriteArgs = {
  postId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};


export type MutationCreatePostArgs = {
  image?: InputMaybe<Scalars['File']['input']>;
  input: CreatePostInput;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteFavoriteArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeletePostArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegistrationArgs = {
  image?: InputMaybe<Scalars['File']['input']>;
  input: RegistrationInput;
};


export type MutationResetPasswordArgs = {
  confirmPassword: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  image?: InputMaybe<Scalars['File']['input']>;
  input: UpdatePostInput;
};


export type MutationUpdateUserArgs = {
  id: Scalars['String']['input'];
  image?: InputMaybe<Scalars['File']['input']>;
  input: UpdateUserInput;
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<AuthorPayload>;
  authorId: Scalars['ID']['output'];
  comments?: Maybe<Array<Maybe<CommentPayload>>>;
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  likes?: Maybe<Array<Maybe<FavoritePostByUser>>>;
  popularity?: Maybe<Scalars['Float']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type PostList = {
  __typename?: 'PostList';
  posts?: Maybe<Array<Maybe<Post>>>;
  total?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getCommentsByPost?: Maybe<Array<Maybe<CommentsByPost>>>;
  getPost?: Maybe<Post>;
  getPosts?: Maybe<PostList>;
  getResentPosts?: Maybe<Array<Maybe<ResentPost>>>;
  getSearchPosts?: Maybe<PostList>;
  getUser: UserPayload;
};


export type QueryGetCommentsByPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetPostsArgs = {
  page?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetResentPostsArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetSearchPostsArgs = {
  search: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  id: Scalars['String']['input'];
};

export type RegistrationInput = {
  aboutUser?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  image?: InputMaybe<Scalars['File']['input']>;
  password: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type ResentPost = {
  __typename?: 'ResentPost';
  authorId: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['Date']['output'];
};

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  subtitle?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  aboutUser?: InputMaybe<Scalars['String']['input']>;
  userName: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  aboutUser?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  favoritePosts?: Maybe<Array<Maybe<FavoritePostByUser>>>;
  id: Scalars['ID']['output'];
  image?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  posts: Array<Post>;
  updatedAt?: Maybe<Scalars['Date']['output']>;
  userName: Scalars['String']['output'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  aboutUser?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  userName: Scalars['String']['output'];
};

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentPayload', updatedAt?: any | null, authorId?: string | null, createdAt?: any | null, content?: string | null, postId?: string | null } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'CommentPayload', authorId?: string | null, content?: string | null, createdAt?: any | null, id?: string | null, updatedAt?: any | null } };

export type GetCommentsByPostQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCommentsByPostQuery = { __typename?: 'Query', getCommentsByPost?: Array<{ __typename?: 'CommentsByPost', authorId?: string | null, content?: string | null, createdAt?: any | null, id?: string | null, updatedAt?: any | null, author?: { __typename?: 'AuthorPayload', image?: string | null, userName?: string | null, aboutUser?: string | null } | null } | null> | null };

export type CreateFavoriteMutationVariables = Exact<{
  postId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
}>;


export type CreateFavoriteMutation = { __typename?: 'Mutation', createFavorite: { __typename?: 'FavoritePostByUser', updatedAt?: any | null, userId?: string | null, createdAt?: any | null, id?: string | null, postId?: string | null } };

export type DeleteFavoriteMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteFavoriteMutation = { __typename?: 'Mutation', deleteFavorite: { __typename?: 'FavoritePostByUser', userId?: string | null, createdAt?: any | null, id?: string | null, postId?: string | null, updatedAt?: any | null } };

export type PostDataFragment = { __typename?: 'Post', authorId: string, content: string, createdAt: any, id: string, image?: string | null, subtitle?: string | null, title: string, updatedAt: any, popularity?: number | null, author?: { __typename?: 'AuthorPayload', image?: string | null, userName?: string | null, aboutUser?: string | null } | null, comments?: Array<{ __typename?: 'CommentPayload', id?: string | null, content?: string | null, createdAt?: any | null, authorId?: string | null, postId?: string | null } | null> | null, likes?: Array<{ __typename?: 'FavoritePostByUser', id?: string | null, userId?: string | null, postId?: string | null, createdAt?: any | null } | null> | null };

export type GetAllPostsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  sortOrder?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', getPosts?: { __typename?: 'PostList', total?: string | null, posts?: Array<{ __typename?: 'Post', authorId: string, content: string, createdAt: any, id: string, image?: string | null, subtitle?: string | null, title: string, updatedAt: any, popularity?: number | null, author?: { __typename?: 'AuthorPayload', image?: string | null, userName?: string | null, aboutUser?: string | null } | null, comments?: Array<{ __typename?: 'CommentPayload', id?: string | null, content?: string | null, createdAt?: any | null, authorId?: string | null, postId?: string | null } | null> | null, likes?: Array<{ __typename?: 'FavoritePostByUser', id?: string | null, userId?: string | null, postId?: string | null, createdAt?: any | null } | null> | null } | null> | null } | null };

export type GetPostsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPostsQuery = { __typename?: 'Query', getPost?: { __typename?: 'Post', authorId: string, content: string, createdAt: any, id: string, image?: string | null, subtitle?: string | null, title: string, updatedAt: any, popularity?: number | null, author?: { __typename?: 'AuthorPayload', image?: string | null, userName?: string | null, aboutUser?: string | null } | null, comments?: Array<{ __typename?: 'CommentPayload', id?: string | null, content?: string | null, createdAt?: any | null, authorId?: string | null, postId?: string | null } | null> | null, likes?: Array<{ __typename?: 'FavoritePostByUser', id?: string | null, userId?: string | null, postId?: string | null, createdAt?: any | null } | null> | null } | null };

export type GetSearchPostsQueryVariables = Exact<{
  search: Scalars['String']['input'];
}>;


export type GetSearchPostsQuery = { __typename?: 'Query', getSearchPosts?: { __typename?: 'PostList', total?: string | null, posts?: Array<{ __typename?: 'Post', authorId: string, content: string, createdAt: any, id: string, image?: string | null, subtitle?: string | null, title: string, updatedAt: any, popularity?: number | null, author?: { __typename?: 'AuthorPayload', image?: string | null, userName?: string | null, aboutUser?: string | null } | null, comments?: Array<{ __typename?: 'CommentPayload', id?: string | null, content?: string | null, createdAt?: any | null, authorId?: string | null, postId?: string | null } | null> | null, likes?: Array<{ __typename?: 'FavoritePostByUser', id?: string | null, userId?: string | null, postId?: string | null, createdAt?: any | null } | null> | null } | null> | null } | null };

export type GetResentPostsQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetResentPostsQuery = { __typename?: 'Query', getResentPosts?: Array<{ __typename?: 'ResentPost', authorId: string, content: string, createdAt: any, id: string, image?: string | null, subtitle?: string | null, title: string, updatedAt: any } | null> | null };

export type UpdatePostMutationVariables = Exact<{
  postInput: UpdatePostInput;
  image?: InputMaybe<Scalars['File']['input']>;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', authorId: string, content: string, createdAt: any, id: string, image?: string | null, subtitle?: string | null, title: string, updatedAt: any, popularity?: number | null, author?: { __typename?: 'AuthorPayload', image?: string | null, userName?: string | null, aboutUser?: string | null } | null, comments?: Array<{ __typename?: 'CommentPayload', id?: string | null, content?: string | null, createdAt?: any | null, authorId?: string | null, postId?: string | null } | null> | null, likes?: Array<{ __typename?: 'FavoritePostByUser', id?: string | null, userId?: string | null, postId?: string | null, createdAt?: any | null } | null> | null } };

export type CreatePostMutationVariables = Exact<{
  postInput: CreatePostInput;
  image?: InputMaybe<Scalars['File']['input']>;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', authorId: string, content: string, createdAt: any, id: string, image?: string | null, subtitle?: string | null, title: string, updatedAt: any, popularity?: number | null, author?: { __typename?: 'AuthorPayload', image?: string | null, userName?: string | null, aboutUser?: string | null } | null, comments?: Array<{ __typename?: 'CommentPayload', id?: string | null, content?: string | null, createdAt?: any | null, authorId?: string | null, postId?: string | null } | null> | null, likes?: Array<{ __typename?: 'FavoritePostByUser', id?: string | null, userId?: string | null, postId?: string | null, createdAt?: any | null } | null> | null } };

export type DeletePostsMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeletePostsMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'Post', authorId: string, content: string, createdAt: any, id: string, image?: string | null, subtitle?: string | null, title: string, updatedAt: any } };

export type GetUserQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'UserPayload', email: string, userId: string, userName: string, image?: string | null, aboutUser?: string | null } };

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', email: string, id: string, userName: string, image?: string | null, aboutUser?: string | null } };

export type UpdateUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  userInput: UpdateUserInput;
  image?: InputMaybe<Scalars['File']['input']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserPayload', userName: string, userId: string, image?: string | null, email: string, aboutUser?: string | null } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', getAllUsers: Array<{ __typename?: 'User', email: string, aboutUser?: string | null, id: string }> };

export type RegistrationMutationVariables = Exact<{
  userInput: RegistrationInput;
  image?: InputMaybe<Scalars['File']['input']>;
}>;


export type RegistrationMutation = { __typename?: 'Mutation', registration?: { __typename?: 'UserPayload', userName: string, userId: string, image?: string | null, email: string, aboutUser?: string | null } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'UserPayload', userName: string, userId: string, image?: string | null, email: string, aboutUser?: string | null } | null };

export type ResetPasswordMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  confirmPassword: Scalars['String']['input'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword?: { __typename?: 'UserPayload', userName: string, userId: string, image?: string | null, email: string, aboutUser?: string | null } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: { __typename?: 'Logout', success?: boolean | null } | null };

export const PostDataFragmentDoc = gql`
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
    `;
export const CreateCommentDocument = gql`
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    updatedAt
    authorId
    createdAt
    content
    postId
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
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
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const GetCommentsByPostDocument = gql`
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
    `;

/**
 * __useGetCommentsByPostQuery__
 *
 * To run a query within a React component, call `useGetCommentsByPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsByPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsByPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCommentsByPostQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsByPostQuery, GetCommentsByPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsByPostQuery, GetCommentsByPostQueryVariables>(GetCommentsByPostDocument, options);
      }
export function useGetCommentsByPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsByPostQuery, GetCommentsByPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsByPostQuery, GetCommentsByPostQueryVariables>(GetCommentsByPostDocument, options);
        }
export type GetCommentsByPostQueryHookResult = ReturnType<typeof useGetCommentsByPostQuery>;
export type GetCommentsByPostLazyQueryHookResult = ReturnType<typeof useGetCommentsByPostLazyQuery>;
export type GetCommentsByPostQueryResult = Apollo.QueryResult<GetCommentsByPostQuery, GetCommentsByPostQueryVariables>;
export const CreateFavoriteDocument = gql`
    mutation CreateFavorite($postId: ID!, $userId: ID!) {
  createFavorite(userId: $userId, postId: $postId) {
    updatedAt
    userId
    createdAt
    id
    postId
  }
}
    `;
export type CreateFavoriteMutationFn = Apollo.MutationFunction<CreateFavoriteMutation, CreateFavoriteMutationVariables>;

/**
 * __useCreateFavoriteMutation__
 *
 * To run a mutation, you first call `useCreateFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFavoriteMutation, { data, loading, error }] = useCreateFavoriteMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFavoriteMutation, CreateFavoriteMutationVariables>(CreateFavoriteDocument, options);
      }
export type CreateFavoriteMutationHookResult = ReturnType<typeof useCreateFavoriteMutation>;
export type CreateFavoriteMutationResult = Apollo.MutationResult<CreateFavoriteMutation>;
export type CreateFavoriteMutationOptions = Apollo.BaseMutationOptions<CreateFavoriteMutation, CreateFavoriteMutationVariables>;
export const DeleteFavoriteDocument = gql`
    mutation DeleteFavorite($id: ID!) {
  deleteFavorite(id: $id) {
    userId
    createdAt
    id
    postId
    updatedAt
  }
}
    `;
export type DeleteFavoriteMutationFn = Apollo.MutationFunction<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>;

/**
 * __useDeleteFavoriteMutation__
 *
 * To run a mutation, you first call `useDeleteFavoriteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteFavoriteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteFavoriteMutation, { data, loading, error }] = useDeleteFavoriteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteFavoriteMutation(baseOptions?: Apollo.MutationHookOptions<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>(DeleteFavoriteDocument, options);
      }
export type DeleteFavoriteMutationHookResult = ReturnType<typeof useDeleteFavoriteMutation>;
export type DeleteFavoriteMutationResult = Apollo.MutationResult<DeleteFavoriteMutation>;
export type DeleteFavoriteMutationOptions = Apollo.BaseMutationOptions<DeleteFavoriteMutation, DeleteFavoriteMutationVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts($page: String, $sortOrder: String) {
  getPosts(page: $page, sortOrder: $sortOrder) {
    total
    posts {
      ...PostData
    }
  }
}
    ${PostDataFragmentDoc}`;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      sortOrder: // value for 'sortOrder'
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($id: ID!) {
  getPost(id: $id) {
    ...PostData
  }
}
    ${PostDataFragmentDoc}`;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetSearchPostsDocument = gql`
    query GetSearchPosts($search: String!) {
  getSearchPosts(search: $search) {
    total
    posts {
      ...PostData
    }
  }
}
    ${PostDataFragmentDoc}`;

/**
 * __useGetSearchPostsQuery__
 *
 * To run a query within a React component, call `useGetSearchPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchPostsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetSearchPostsQuery(baseOptions: Apollo.QueryHookOptions<GetSearchPostsQuery, GetSearchPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchPostsQuery, GetSearchPostsQueryVariables>(GetSearchPostsDocument, options);
      }
export function useGetSearchPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSearchPostsQuery, GetSearchPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchPostsQuery, GetSearchPostsQueryVariables>(GetSearchPostsDocument, options);
        }
export type GetSearchPostsQueryHookResult = ReturnType<typeof useGetSearchPostsQuery>;
export type GetSearchPostsLazyQueryHookResult = ReturnType<typeof useGetSearchPostsLazyQuery>;
export type GetSearchPostsQueryResult = Apollo.QueryResult<GetSearchPostsQuery, GetSearchPostsQueryVariables>;
export const GetResentPostsDocument = gql`
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
    `;

/**
 * __useGetResentPostsQuery__
 *
 * To run a query within a React component, call `useGetResentPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetResentPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetResentPostsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetResentPostsQuery(baseOptions: Apollo.QueryHookOptions<GetResentPostsQuery, GetResentPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetResentPostsQuery, GetResentPostsQueryVariables>(GetResentPostsDocument, options);
      }
export function useGetResentPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetResentPostsQuery, GetResentPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetResentPostsQuery, GetResentPostsQueryVariables>(GetResentPostsDocument, options);
        }
export type GetResentPostsQueryHookResult = ReturnType<typeof useGetResentPostsQuery>;
export type GetResentPostsLazyQueryHookResult = ReturnType<typeof useGetResentPostsLazyQuery>;
export type GetResentPostsQueryResult = Apollo.QueryResult<GetResentPostsQuery, GetResentPostsQueryVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($postInput: UpdatePostInput!, $image: File) {
  updatePost(input: $postInput, image: $image) {
    ...PostData
  }
}
    ${PostDataFragmentDoc}`;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postInput: // value for 'postInput'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($postInput: CreatePostInput!, $image: File) {
  createPost(input: $postInput, image: $image) {
    ...PostData
  }
}
    ${PostDataFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      postInput: // value for 'postInput'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostsDocument = gql`
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
    `;
export type DeletePostsMutationFn = Apollo.MutationFunction<DeletePostsMutation, DeletePostsMutationVariables>;

/**
 * __useDeletePostsMutation__
 *
 * To run a mutation, you first call `useDeletePostsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostsMutation, { data, loading, error }] = useDeletePostsMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostsMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostsMutation, DeletePostsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostsMutation, DeletePostsMutationVariables>(DeletePostsDocument, options);
      }
export type DeletePostsMutationHookResult = ReturnType<typeof useDeletePostsMutation>;
export type DeletePostsMutationResult = Apollo.MutationResult<DeletePostsMutation>;
export type DeletePostsMutationOptions = Apollo.BaseMutationOptions<DeletePostsMutation, DeletePostsMutationVariables>;
export const GetUserDocument = gql`
    query GetUser($userId: String!) {
  getUser(id: $userId) {
    email
    userId
    userName
    image
    aboutUser
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: String!) {
  deleteUser(id: $userId) {
    email
    id
    userName
    image
    aboutUser
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($userId: String!, $userInput: UpdateUserInput!, $image: File) {
  updateUser(id: $userId, image: $image, input: $userInput) {
    userName
    userId
    image
    email
    aboutUser
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      userInput: // value for 'userInput'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetAllUsersDocument = gql`
    query getAllUsers {
  getAllUsers {
    email
    aboutUser
    id
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const RegistrationDocument = gql`
    mutation Registration($userInput: RegistrationInput!, $image: File) {
  registration(input: $userInput, image: $image) {
    userName
    userId
    image
    email
    aboutUser
  }
}
    `;
export type RegistrationMutationFn = Apollo.MutationFunction<RegistrationMutation, RegistrationMutationVariables>;

/**
 * __useRegistrationMutation__
 *
 * To run a mutation, you first call `useRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registrationMutation, { data, loading, error }] = useRegistrationMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useRegistrationMutation(baseOptions?: Apollo.MutationHookOptions<RegistrationMutation, RegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistrationMutation, RegistrationMutationVariables>(RegistrationDocument, options);
      }
export type RegistrationMutationHookResult = ReturnType<typeof useRegistrationMutation>;
export type RegistrationMutationResult = Apollo.MutationResult<RegistrationMutation>;
export type RegistrationMutationOptions = Apollo.BaseMutationOptions<RegistrationMutation, RegistrationMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    userName
    userId
    image
    email
    aboutUser
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($email: String!, $password: String!, $confirmPassword: String!) {
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
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;