import React from "react";
import * as ReactDOM from "react-dom/client";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import App from "./App";
import "./index.css"; 

import ThemeProvider from "./context/Theme";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/", // Change to local URI if testing locally
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Specify that 'root' is not null
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootElement);

// Render the app with Apollo and Theme providers
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
);
