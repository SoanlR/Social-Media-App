// src/context/AuthContext.tsx
import React, { useReducer, createContext, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";
import {
  AuthState,
  User,
  AuthContextProps,
  AuthAction,
  UserData,
} from "../interfaces/auth";

const initialState: AuthState = {
  user: null,
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode<User>(
    localStorage.getItem("jwtToken") as string
  );
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (userData: UserData) => {
    const decodedUser = jwtDecode<User>(userData.token);
    localStorage.setItem("jwtToken", userData.token);
    dispatch({ type: "LOGIN", payload: decodedUser });
  };

  const logout = () => {
    localStorage.removeItem("jwtToken");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
