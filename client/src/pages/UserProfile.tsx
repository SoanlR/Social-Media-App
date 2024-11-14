import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { AuthContext } from "../context/Auth";
import UserDetails from "../components/UserDetails";
import { GET_USER_QUERY } from "../util/Graphql";

type UserProfileParams = {
  userId: string;
} & Record<string, string | undefined>;

interface UserData {
  id: string;
  username: string;
  email: string;
  photoURL: string;
  createdAt: string;
}

const UserProfile: React.FC = () => {
  const { userId } = useParams<UserProfileParams>();
  const { user } = useContext(AuthContext);

  const { loading, data } = useQuery<{ getUser: UserData }>(GET_USER_QUERY, {
    variables: { userId },
    skip: !userId,
  });

  if (user && user.id === userId) {
    return <UserDetails user={user as unknown as UserData} auth={!!user} />;
  }

  if (loading) {
    return (
      <p className="text-center text-gray-500 mt-10">Loading user profile...</p>
    );
  }

  const newUser = data?.getUser;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto mt-10 flex">
        {newUser ? (
          <UserDetails user={newUser} />
        ) : (
          <p className="text-center text-red-500">User not found</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
