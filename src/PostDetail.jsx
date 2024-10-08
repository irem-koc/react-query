import { useMutation, useQuery } from "@tanstack/react-query";
import { deletePost, fetchComments, updatePost } from "./api";
import "./PostDetail.css";

export function PostDetail({ post }) {
  console.log(post);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["comments", post.id],
    queryFn: () => fetchComments(post.id),
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: () => {
      alert("Successfully deleted!");
    },
  });
  const editMutation = useMutation({
    mutationFn: (id) => updatePost(id),
    onSuccess: (result) => {
      alert(result, " successfully edited!!!");
    },
  });
  const handleEdit = () => {
    editMutation.mutate(post.id);
  };
  const handleDelete = () => {
    deleteMutation.mutate(post.id);
  };
  if (isLoading) {
    return <div>loading ....</div>;
  }
  if (isError) {
    return <div>errorrr ....</div>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={handleDelete}>Delete</button>{" "}
      <button onClick={handleEdit}>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data?.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
