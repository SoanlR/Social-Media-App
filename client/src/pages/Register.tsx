import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/Auth";
import { useForm } from "../util/Hooks";
import { ApolloError } from "@apollo/client";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthContextType {
  login: (userData: any) => void;
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const Register: React.FC = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { onChange, onSubmit, values } = useForm<RegisterFormValues>(
    registerUserCallback,
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError(err: ApolloError) {
      const errors =
        (err as unknown as GraphQLError).graphQLErrors?.[0]?.extensions
          ?.exception?.errors ?? {};
      setErrors(errors);
    },
    variables: values,
  });

  function registerUserCallback() {
    addUser();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">Register</h1>
        <form
          onSubmit={onSubmit}
          noValidate
          className={`space-y-4 ${loading ? "animate-pulse" : ""}`}
        >
          <div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email.."
              value={values.email}
              onChange={onChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password.."
              value={values.confirmPassword}
              onChange={onChange}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Register
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

export default Register;
