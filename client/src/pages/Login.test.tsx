// src/components/Login/Login.test.tsx
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import Login from "./Login";
import { LOGIN_USER } from "./Login"; // Import mutation

// Create a mock response for the mutation
const mocks = [
  {
    request: {
      query: LOGIN_USER,
      variables: { username: "testuser", password: "password123" },
    },
    result: {
      data: {
        login: { token: "mock-token", username: "testuser" },
      },
    },
  },
];

describe("Login Component", () => {
  test("should login user successfully", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login />
      </MockedProvider>
    );

    // Simulate typing in the username and password fields
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/submit/i));

    // Wait for mutation to complete and check if redirect happens
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    // Check if the token is saved in localStorage
    expect(localStorage.getItem("jwtToken")).toBe("mock-token");
  });
});
