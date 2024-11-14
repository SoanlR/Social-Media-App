import React, { useContext, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { gql, useMutation, useQuery } from "@apollo/client";

import { AuthContext } from "../context/Auth";
import { ThemeContext } from "../context/Theme";

import DeleteButton from "../components/DeleteButton";
import CardsButtons from "../components/CardsButtons";

interface PostData {
  id: string;
  body: string;
  createdAt: string;
  username: string;
  likeCount: number;
  commentCount: number;
  likes: { username: string }[];
  comments: CommentData[];
  user: {
    photoURL: string;
  };
}

interface CommentData {
  id: string;
  body: string;
  createdAt: string;
  username: string;
}

const SinglePost: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const { user } = useContext(AuthContext);
  const { buttonSize } = useContext(ThemeContext);

  const commentInputRef = useRef<HTMLInputElement>(null);
  const [comment, setComment] = useState("");

  const { data } = useQuery<{ getPost: PostData }>(FETCH_POST_QUERY, {
    variables: { postId },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment("");
      commentInputRef.current?.blur();
    },
    onError: (error) => console.error("Error submitting comment:", error),
    variables: { postId, body: comment },
  });

  let postMarkup;

  if (!data?.getPost) {
    postMarkup = <h1 className="text-2xl font-bold">Loading post...</h1>;
  } else {
    const {
      id,
      body,
      user: { photoURL },
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;

    postMarkup = (
      <div className="min-h-screen mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="col-span-1">
            <div className="p-6 bg-white shadow-lg rounded-lg">
              <div className="flex items-center mb-4">
                <img
                  src={photoURL}
                  alt={`${username}'s profile`}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-lg font-semibold">{username}</h2>
                  <p className="text-sm text-gray-500">
                    {moment(createdAt).fromNow()}
                  </p>
                </div>
              </div>
              <p className="text-gray-800 mb-4">{body}</p>
              <div className="border-t border-gray-200 pt-4">
                <CardsButtons
                  user={
                    user
                      ? { username: user.username, isAdmin: user.isAdmin }
                      : null
                  }
                  buttonSize={buttonSize}
                  post={{ id, likes, likeCount, commentCount, body }}
                />
              </div>
            </div>

            {user && (
              <div className="mt-4 p-6 bg-white shadow-lg rounded-lg">
                <p className="text-lg font-semibold mb-4">Post a comment</p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (comment.trim()) submitComment();
                  }}
                >
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Comment..."
                      ref={commentInputRef}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={comment.trim() === ""}
                      className="bg-teal-500 text-white px-4 py-2 rounded-r-lg hover:bg-teal-600 disabled:bg-teal-300"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}

            {comments.map((comment) => (
              <div
                key={comment.id}
                className="mt-4 p-6 bg-white shadow-lg rounded-lg"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-md font-semibold">
                      {comment.username}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {moment(comment.createdAt).fromNow()}
                    </p>
                  </div>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                </div>
                <p className="text-gray-800 mt-2">{comment.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{postMarkup}</>;
};

export const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      user {
        photoURL
      }
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default SinglePost;
