import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../../components/PostForm";
import { getPostById, updatePost } from "../../apis/posts";
import "./index.css";

export default function EditPost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
  }, [id]);

  const handleUpdate = async (data) => {
    await updatePost(id, data);
    navigate(`/posts/${id}`);
  };

  if (!post) return <div>...Loading</div>;

  return (
    <div className="edit-post-container">
      <div className="edit-post-page">
        <h2>Edit Post Id : {id}</h2>
        <PostForm onSubmit={handleUpdate} initialValues={post} />
      </div>
    </div>
  );
}
