import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { useForm } from '../util/Hooks';
import { FETCH_POSTS_QUERY } from '../util/Graphql';

interface FormValues {
  body: string;
}

interface Post {
  id: string;
  body: string;
  createdAt: string;
  username: string;
  likeCount: number;
  commentCount: number;
  likes: any[];  // Adjust type if you have a more specific type for like objects
  comments: any[];  // Adjust type if you have a more specific type for comments
}

interface FetchPostsData {
  getPosts: Post[];
}

const PostForm: React.FC = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, { body: '' });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery<FetchPostsData>({
        query: FETCH_POSTS_QUERY,
      });

      if (data) {
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: [result.data.createPost, ...data.getPosts], // Update the cache with the new post
          },
        });
      }

      values.body = ''; // Clear the input after submission
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 bg-white shadow-md rounded-md">
      <form onSubmit={onSubmit}>
        <h5 className="text-xl font-semibold mb-4">Create a post:</h5>
        <div className="mb-4">
          <input
            type="text"
            name="body"
            value={values.body}
            onChange={onChange}
            placeholder="Hi world"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error.graphQLErrors[0]?.message}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-teal-500 text-white font-semibold rounded-lg hover:bg-teal-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
