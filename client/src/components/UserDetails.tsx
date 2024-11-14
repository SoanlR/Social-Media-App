import React, { useState, useEffect, useContext } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../util/FireStore";
import { useMutation } from "@apollo/client";
import moment from "moment";

import { FETCH_POSTS_QUERY, UPDATE_USER_MUTATION } from "../util/Graphql";
import { AuthContext } from "../context/Auth";
import { useForm } from "../util/Hooks";
import userImage from "../assets/user.png";

interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  photoURL: string;
}

interface UserDetailsProps {
  user: User;
  auth?: boolean;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, auth = false }) => {
  const imageUrl = userImage;
  const [newPhoto, setNewPhoto] = useState<string>(user?.photoURL || imageUrl);
  const [file, setFile] = useState<File | null>(null);
  const { login } = useContext(AuthContext);
  const { values, onSubmit } = useForm(updateProfileCallback, {
    photoURL: newPhoto,
  });
  useEffect(() => {
    if (user?.photoURL !== newPhoto) {
      updateUserMutation();
    }
  }, [newPhoto]);

  const [updateUserMutation] = useMutation(UPDATE_USER_MUTATION, {
    variables: {
      userId: user?.id,
      photoURL: newPhoto,
    },
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
    update(store, { data: { updateUser } }) {
      localStorage.removeItem("jwtToken");
      localStorage.setItem("jwtToken", updateUser.token);
      login(updateUser);
      setFile(null);
      values.photoURL = "";
    },
  });

  function updateProfileCallback() {
    uploadImage();
  }

  const uploadImage = async () => {
    if (file === null) return;

    const imageRef = ref(storage, `images/${file.name}`);

    await uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setNewPhoto(url);
      });
    });
  };
  const handleButtonClick = () => {
    const fileInput = document.getElementById("file");
    if (fileInput) {
      fileInput.click();
    } else {
      console.error("File input element not found.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto text-center p-4">
        <h1 className="text-3xl font-semibold mb-6">User Profile</h1>
        <div className="w-80 mx-auto p-4 bg-white rounded-lg shadow-lg">
          <img
            src={newPhoto}
            alt="User Avatar"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          {auth && (
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <button
                  type="button"
                  className="px-4 py-2 bg-teal-500 text-white rounded-lg"
                  onClick={handleButtonClick}
                >
                  Choose file
                </button>
                <input
                  type="file"
                  accept="image/*"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
              >
                Upload image
              </button>
              {file?.name && (
                <div className="mt-4">
                  <span className="text-sm text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    className="text-red-500 text-sm ml-2"
                    onClick={() => setFile(null)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>
          )}
          <div className="mt-6">
            <h2 className="text-xl font-semibold">{user?.username}</h2>
            <p className="text-gray-500">
              Joined {moment(user?.createdAt).fromNow()}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-gray-700">
              <strong>Email:</strong> {user?.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
