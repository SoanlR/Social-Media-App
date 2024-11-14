import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { FETCH_POSTS_QUERY } from "../util/Graphql";

interface DeleteButtonProps {
  buttonSize?: "mini" | "small" | "medium" | "large" | "huge";
  postId: string;
  commentId?: string;
  callback?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  buttonSize,
  postId,
  commentId,
  callback,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        }) as { getPosts: Array<{ id: string }> };

        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: {
            getPosts: data.getPosts.filter((p) => p.id !== postId),
          },
        });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <button
        onClick={() => setConfirmOpen(true)}
        className={`flex items-center justify-center p-2 text-white bg-red-500 hover:bg-red-600 rounded-lg ${
          buttonSize === "mini"
            ? "text-sm"
            : buttonSize === "small"
            ? "text-base"
            : buttonSize === "medium"
            ? "text-lg"
            : "text-xl"
        }`}
      >
        <i className="fas fa-trash-alt" />
      </button>

      {confirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={() => setConfirmOpen(false)}
          />
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full z-10">
            <h2 className="text-lg mb-4">
              Are you sure you want to delete this{" "}
              {commentId ? "comment" : "post"}?
            </h2>
            <div className="flex justify-between">
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md text-black"
              >
                Cancel
              </button>
              <button
                onClick={() => deletePostOrMutation}
                className="px-4 py-2 bg-red-500 rounded-md text-white"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
