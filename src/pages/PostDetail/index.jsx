import "./index.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../apis/posts";
import { createPortal } from "react-dom";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favoritePosts") || "[]");

    const newFavorite = [
      ...favorites,
      { id: post.id, title: post.title, body: post.body },
    ];
    localStorage.setItem("favoritePosts", JSON.stringify(newFavorite));

    setShowModal(false);
  };

  const modalContainer = document.querySelector(".main-content");

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
  }, [id]);

  if (!post) return <div>...Loading</div>;

  return (
    <div className="postDetailCont">
      <h2>
        <strong>Post ID : {id}</strong>
        <p>{post.title}</p>
      </h2>
      <p>{post.body}</p>
      <div className="btn_box">
        <Link to={`/posts/${post.id}/edit`} className="btn">
          EDIT
        </Link>
        <button className="btn" onClick={() => setShowModal(true)}>
          즐겨찾기
        </button>
      </div>
      {showModal &&
        createPortal(
          <div className="modal_cont">
            <h3>즐겨찾기에 추가하시겠습니까?</h3>
            <div className="btn_box">
              <button className="btn" onClick={handleAddFavorite}>
                Yes
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                No
              </button>
            </div>
          </div>,
          modalContainer
        )}
    </div>
  );
}
