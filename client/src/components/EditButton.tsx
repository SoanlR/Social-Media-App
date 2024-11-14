import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from '../util/Hooks';

interface EditButtonProps {
  buttonSize: 'mini' | 'small' | 'medium' | 'large';
  postId: string;
  postBody: string;
}

const EditButton: React.FC<EditButtonProps> = ({ buttonSize, postId, postBody }) => {
  const [openModal, setOpenModal] = useState(false);
  const { values, onChange } = useForm(updatePostCallback, { body: postBody });

  const [updatePostMutation, { loading }] = useMutation(UPDATE_POST_MUTATION, {
    update() {
      setOpenModal(false);
    },
    variables: {
      postId,
      body: values.body
    },
  });

  function updatePostCallback() {
    updatePostMutation();
  }

  return (
    <>
      <button
        className={`flex items-center justify-center bg-blue-500 text-white ${buttonSize === 'mini' ? 'p-2 text-xs' : buttonSize === 'small' ? 'p-3 text-sm' : buttonSize === 'medium' ? 'p-2 text-lg' : 'p-5 text-xl'} rounded-full hover:bg-blue-600 focus:outline-none`}
        onClick={() => setOpenModal(true)}
      >
        <i className="fas fa-edit"></i>
      </button>

      {openModal && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg w-1/3 p-6">
            <h3 className="text-2xl font-semibold mb-4">Edit Post</h3>
            <textarea
              className="w-full h-40 p-2 border border-gray-300 rounded-md"
              name="body"
              value={values.body}
              onChange={() =>onChange}
            />
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </button>
              <button
                className={`bg-blue-500 text-white px-4 py-2 rounded-md ${loading ? 'opacity-50' : 'hover:bg-blue-600'}`}
                onClick={() =>updatePostMutation}
                disabled={loading}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const UPDATE_POST_MUTATION = gql`
  mutation updatePost($postId: ID!, $body: String!) {
    updatePost(postId: $postId, body: $body) {
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

export default EditButton;
