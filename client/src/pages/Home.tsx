import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { AuthContext } from '../context/Auth';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/Graphql';

interface Post {
  id: string;
  body: string;
  createdAt: string;
  username: string;
  user: {
    id: string;
    photoURL: string;
  };
  likeCount: number;
  commentCount: number;
  likes: Array<any>;
}

const Home: React.FC = () => {
  const { loading, data } = useQuery<{ getPosts: Post[] }>(FETCH_POSTS_QUERY);

  const { user } = useContext(AuthContext);

  const COMPUTER_COLUMN = 9;
  const TABLET_COLUMN = 16;

  return (
    <div className="container mx-auto px-4">
      {user && (
        <div className="mb-8">
          <div className={`lg:w-${COMPUTER_COLUMN}/12 w-full`}>
            <PostForm />
          </div>
        </div>
      )}

      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-center">Recent Posts</h1>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <h1 className="text-lg text-gray-600">Loading posts...</h1>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.getPosts &&
            data.getPosts.map((post) => (
              <div
                className="col-span-1"
                key={post.id}
                style={{ marginBottom: '20px' }}
              >
                <PostCard post={post} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
