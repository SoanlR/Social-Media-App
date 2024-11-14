import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/Auth";
import { useForm } from "../util/Hooks";
import { ApolloError } from "@apollo/client";

interface LoginFormValues {
  username: string;
  password: string;
}


export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      photoURL
      isAdmin
      token
    }
  }
`;

const Login: React.FC = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { onChange, onSubmit, values } = useForm<LoginFormValues>(
    loginUserCallback,
    {
      username: "",
      password: "",
    }
  );

  interface GraphQLError {
    graphQLErrors: Array<{
      extensions?: {
        exception?: {
          errors?: Record<string, any>;
        };
      };
    }>;
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      navigate("/");
    },

    onError(err: ApolloError) {
      const errors =
        (err as unknown as GraphQLError).graphQLErrors?.[0]?.extensions
          ?.exception?.errors ?? {};
      setErrors(errors as Record<string, any>);
    },

    variables: values,
  });
  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>
        <form
          onSubmit={onSubmit}
          noValidate
          className={`space-y-4 ${loading ? "animate-pulse" : ""}`}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username.."
              value={values.username}
              onChange={onChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password.."
              value={values.password}
              onChange={onChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Login
          </button>
        </form>
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            <ul>
              {Object.values(errors).map((value, index) => (
                <li key={index} className="text-sm">
                  {value}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
