// src/components/LikeButton.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import MyPopup from "../util/MyPopUp";

interface LikeButtonProps {
  buttonSize: "mini" | "small" | "medium" | "large" | "huge";
  user: { username: string } | null;
  post: {
    id: string;
    likeCount: number;
    likes: Array<{ username: string }>;
  };
}

const LikeButton: React.FC<LikeButtonProps> = ({
  buttonSize,
  user,
  post: { id, likeCount, likes = [] },
}) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const [likePost, { loading, error }] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });
  const handleNavigate = () => {
    navigate("/login");
  };
  const likeButton = user ? (
    liked ? (
      <button
        className={`flex items-center justify-center p-2 rounded-full bg-teal-500 text-white ${
          buttonSize === "mini" ? "text-xs" : "text-sm"
        } hover:bg-teal-600`}
        onClick={() => user && likePost()}
      >
        <i className="fas fa-heart"></i>
      </button>
    ) : (
      <button
        className={`flex items-center justify-center p-2 rounded-full bg-teal-500 text-white ${
          buttonSize === "mini" ? "text-xs" : "text-sm"
        } hover:bg-teal-600`}
        onClick={() => user && likePost()}
      >
        <i className="far fa-heart"></i>
      </button>
    )
  ) : (
    <button
      className={`flex items-center justify-center p-2 rounded-full bg-teal-500 text-white ${
        buttonSize === "mini" ? "text-xs" : "text-sm"
      } hover:bg-teal-600`}
      onClick={() => handleNavigate()}
    >
      <i className="far fa-heart"></i>
    </button>
  );

  return (
    <div className="flex items-center space-x-2">
      {likeButton}
      <span className="text-teal-500 text-sm">{likeCount}</span>
    </div>
  );
};

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;
