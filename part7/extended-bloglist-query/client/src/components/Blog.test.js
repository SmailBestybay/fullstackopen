import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("blog component", () => {
  let blog;

  beforeEach(() => {
    blog = {
      title: "Test title",
      author: "Tester Author",
      likes: 0,
      user: {
        name: "Tester is the name",
        username: "Tester is the username",
        id: "123123",
      },
      url: "example@url.com",
    };
  });

  test("renders blog title and author", () => {
    render(<Blog blog={blog} user={blog.user} />);
    const element = screen.getByText("Test title Tester Author");
    expect(element).toBeDefined();
  });

  test("does not render url by default", () => {
    render(<Blog blog={blog} user={blog.user} />);
    const url = screen.queryByText(blog.url);
    expect(url).toBeNull();
  });

  test("does not render likes by default", () => {
    render(<Blog blog={blog} user={blog.user} />);
    const likes = screen.queryByText(blog.url);
    expect(likes).toBeNull();
  });

  test("url and likes are shown when the view butoon is clicked", async () => {
    render(<Blog blog={blog} user={blog.user} />);
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);
    const nameElement = screen.getByText("Tester is the name");
    expect(nameElement).toBeDefined();
    const likesElement = screen.queryByText("likes");
    expect(likesElement).toBeDefined();
  });

  test("triggers event handler twice when like button is clicked twice", async () => {
    const mockHandler = jest.fn();
    render(<Blog blog={blog} user={blog.user} handleLike={mockHandler} />);
    const user = userEvent.setup();
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
