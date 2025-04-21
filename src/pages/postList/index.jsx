import React, { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../../apis/posts";
import { Link } from "react-router-dom";
import "./index.css"

export default function PostList() {
  const [postList, setPostList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getAllPosts().then(res => {
      setPostList(res);
    });
  }, [])

  async function handleDelete() {
    if (openModal === false) return;

    setIsDeleting(true);

    try {
      await deletePost(openModal);
      setPostList(prev => prev.filter((p) => p.id !== openModal));
    } catch (err) {
      console.error('게시물 삭제 실패, ', err);
    } finally {
      setIsDeleting(false);
      setOpenModal(false);
    }
  }

  return (
    <section className="postListSection">
      <h3>Posts List</h3>
      <ul>
        {
          postList.map(post => (
            <li key={post.id + post.title}>
              <Link to={`/posts/${post.id}`}>{post.id}. {post.title}</Link>
              <button onClick={() => setOpenModal(post.id)}>Delete</button>
            </li>
          ))
        }
      </ul>

      {
        openModal && (
          <div className="deleteModal">
            <h3>{openModal}번 게시물을 삭제하시겠습니까?</h3>
            <div className="btns">
              <button onClick={handleDelete}>Yes</button>
              <button onClick={() => setOpenModal(false)}>No</button>
            </div>
          </div>
        )
      }
    </section>
  )
}
