import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("blogFrom componenet receives right details for new blog", async () => {
  const createBlog = jest.fn();
  const mockFn = jest.fn();
  const user = userEvent.setup();
  const newBlog = {
    title: "testy title",
    author: "testy author",
    url: "test@url.com",
  };

  render(
    <BlogForm
      createBlog={createBlog}
      notify={mockFn}
      togglableRef={{ content: 0 }}
    />
  );

  const inputs = screen.getAllByRole("textbox");
  const createButton = screen.getByText("create");

  await user.type(inputs[0], newBlog.title);
  await user.type(inputs[1], newBlog.author);
  await user.type(inputs[2], newBlog.url);
  await user.click(createButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0]).toEqual(newBlog);
});
