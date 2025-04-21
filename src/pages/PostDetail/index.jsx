import "./index.css";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPostById } from "../../apis/posts";
import { createPortal } from "react-dom";

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const modalContainer = document.body;

  useEffect(() => {
    getPostById(id).then((res) => setPost(res));
  }, [id]);

  if (!post) return <div>...Loading</div>;

  return (
    <div>
      <h2>
        <span>Post ID : {id}</span>
        <br />
        <strong>{post.title}</strong>
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
            <div className="modal_btn_box">
              <button>Yes</button>
              <button onClick={() => setShowModal(false)}>No</button>
            </div>
          </div>,
          modalContainer
        )}
      ;
    </div>
  );
}
