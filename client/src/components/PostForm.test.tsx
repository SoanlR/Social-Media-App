// src/components/PostForm/PostForm.test.tsx
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import PostForm from "./PostForm";
import { CREATE_POST_MUTATION } from "./PostForm";

// Mock the response for creating a post
const mocks = [
  {
    request: {
      query: CREATE_POST_MUTATION,
      variables: { body: "This is a test post" },
    },
    result: {
      data: {
        createPost: {
          id: "1",
          body: "This is a test post",
          createdAt: "2021-11-13T12:00:00Z",
          username: "testuser",
          likeCount: 0,
          commentCount: 0,
          likes: [],
          comments: [],
        },
      },
    },
  },
];

describe("PostForm Component", () => {
  test("should create a post successfully", async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <PostForm />
      </MockedProvider>
    );

    // Simulate typing in the post body input field
    fireEvent.change(screen.getByPlaceholderText(/Hi world/i), {
      target: { value: "This is a test post" },
    });

    // Simulate form submission
    fireEvent.click(screen.getByText(/submit/i));

    // Wait for the mutation to complete
    await waitFor(() =>
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    );

    // Check if the new post appears on the UI
    expect(screen.getByText("This is a test post")).toBeInTheDocument();
  });
});
