import React, { useEffect, useState } from "react";
import { deletePost, getAllPosts } from "../../apis/posts";
import { Link } from "react-router-dom";
import "./index.css"
import { createPortal } from "react-dom";
import PortalModalContainer from "../../components/PortalModalContainer";

export default function PostList() {
  const [allPosts, setAllPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 10;
  const [openModal, setOpenModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    getAllPosts().then(res => {
      setAllPosts(res);
      setVisiblePosts(res.slice(0, POSTS_PER_PAGE));
    });
  }, [])

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        loadMorePosts();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, allPosts])

  const loadMorePosts = () => {
    const nextPage = page + 1;
    console.log(nextPage);
    const nextPosts = allPosts.slice(0, nextPage * POSTS_PER_PAGE);
    if(visiblePosts.length === nextPosts.length) return;

    setVisiblePosts(nextPosts);
    setPage(nextPage);
  }

  async function handleDelete() {
    if (openModal === false) return;

    setIsDeleting(true);

    try {
      await deletePost(openModal);
      setVisiblePosts(prev => prev.filter((p) => p.id !== openModal));
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
          visiblePosts.map(post => (
            <li key={post.id + post.title}>
              <Link to={`/posts/${post.id}`}>{post.id}. {post.title}</Link>
              <button onClick={() => setOpenModal(post.id)}>Delete</button>
            </li>
          ))
        }
      </ul>

      {
        openModal && createPortal(
          <PortalModalContainer onClose={() => setOpenModal(false)}>
            <div className="deleteModal">
              <h3>{openModal}번 게시물을 삭제하시겠습니까?</h3>
              <div className="btns">
                <button onClick={handleDelete} disabled={isDeleting}>Yes</button>
                <button onClick={() => setOpenModal(false)} disabled={isDeleting}>No</button>
              </div>
            </div>
          </PortalModalContainer>,
          document.body
        )
      }
    </section>
  )
}
