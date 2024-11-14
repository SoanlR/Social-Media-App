import React, { useContext } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { AuthContext } from "../context/Auth";
import CardsButtons from "./CardsButtons";
import { ThemeContext } from "../context/Theme";
import userImage from "../assets/user.png";

interface PostUser {
  id: string;
  photoURL: string;
}

interface Post {
  body: string;
  createdAt: string;
  id: string;
  username: string;
  user: PostUser;
  likeCount: number;
  commentCount: number;
  likes: any[];
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { user } = useContext(AuthContext);
  const { isDarkTheme, buttonSize } = useContext(ThemeContext);
  const imageUrl = post.user.photoURL || userImage;
  const userData = user
    ? { username: user.username, isAdmin: user.isAdmin }
    : null;

  return (
    <div
      className={`bg-white ${
        isDarkTheme ? "bg-gray-800 text-black" : "bg-gray-100"
      } rounded-lg shadow-lg overflow-hidden mb-6`}
    >
      <div className="p-4 flex items-start">
        <Link to={`/user/${post.user.id}`}>
          <img
            src={imageUrl}
            alt={post.username}
            className="w-12 h-12 rounded-full object-cover mr-4"
          />
        </Link>
        <div className="flex-1">
          <div className="text-lg font-semibold">{post.username}</div>
          <div className="text-sm text-gray-500">
            <Link to={`/posts/${post.id}`} className="hover:underline">
              {moment(post.createdAt).fromNow(true)}
            </Link>
          </div>
          <p className="mt-2 text-gray-700">{post.body}</p>
        </div>
      </div>
      <div className="bg-gray-50 p-4 flex justify-between items-center">
        <CardsButtons
          user={userData}
          buttonSize={buttonSize}
          post={{
            id: post.id,
            likes: post.likes,
            likeCount: post.likeCount,
            commentCount: post.commentCount,
            body: post.body,
          }}
        />
      </div>
    </div>
  );
};

export default PostCard;
