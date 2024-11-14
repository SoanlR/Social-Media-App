import React from "react";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import CommentButton from "./CommentButton";


interface Post {
  id: string;
  likes: Array<{ username: string }>;
  likeCount: number;
  commentCount: number;
  body: string;
}

interface CardsButtonsProps {
  user: { username: string; isAdmin: boolean } | null;
  buttonSize: "mini" | "small" | "medium" | "large";
  post: Post;
}

const CardsButtons: React.FC<CardsButtonsProps> = ({
  user,
  buttonSize,
  post,
}) => {
  const { id, likes, likeCount, commentCount, body } = post;

  return (
    <div className="flex space-x-4">
      <LikeButton
        buttonSize={buttonSize}
        user={user}
        post={{ id, likes, likeCount }}
      />
      <CommentButton buttonSize={buttonSize} post={{ id, commentCount }} />
      {(user?.isAdmin || user?.username) && (
        <div className="flex space-x-4">
          <DeleteButton buttonSize={buttonSize} postId={id} />
          <EditButton buttonSize={buttonSize} postId={id} postBody={body} />
        </div>
      )}
    </div>
  );
};

export default CardsButtons;
