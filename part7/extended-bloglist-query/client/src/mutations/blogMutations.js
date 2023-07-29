import { useMutation, useQueryClient } from "react-query";
import blogService from "../services/blogs";

export const useNewBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData("blogs", blogs.concat(newBlog));
    },
  });
};

export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData("blogs");
      queryClient.setQueryData(
        "blogs",
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      );
    },
  });
};

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_, deletedBlogId) => {
      const blogs = queryClient.getQueriesData("blogs");
      queryClient.setQueriesData(
        "blogs",
        blogs.filter((b) => b.id === deletedBlogId)
      );
    },
  });
};
