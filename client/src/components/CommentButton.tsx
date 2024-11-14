import React from "react";
import { Link } from "react-router-dom";

interface CommentButtonProps {
  buttonSize: "mini" | "small" | "medium" | "large" | "huge";
  post: {
    id: string;
    commentCount: number;
  };
}

const CommentButton: React.FC<CommentButtonProps> = ({
  buttonSize,
  post: { id, commentCount },
}) => {
  return (
    <div className="relative">
      <Link to={`/posts/${id}`} className="flex items-center">
        <button
          className={`${
            buttonSize === "mini"
              ? "text-sm p-2"
              : buttonSize === "small"
              ? "text-base p-3"
              : buttonSize === "medium"
              ? "text-lg p-2"
              : "text-xl p-5"
          } flex items-center justify-center bg-blue-500 text-white hover:bg-blue-600 rounded-full border-none`}
        >
          <i className="fas fa-comments"></i>
        </button>
        <span className="ml-2 text-blue-500">{commentCount}</span>
      </Link>
    </div>
  );
};

export default CommentButton;
