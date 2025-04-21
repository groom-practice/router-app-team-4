import React, { useState } from "react";
import { createPortal } from "react-dom";
import "./index.css";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="home">
      <h3>Welcome To Main Page!</h3>
      <button onClick={() => setShowModal(true)}>로그인</button>
      {showModal &&
        createPortal(
          <LoginModal onClose={() => setShowModal(false)} />,
          document.body
        )}
    </div>
  );
}

// 로그인 모달
function LoginModal({ onClose }) {
  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <p> 로그인 해주세요 </p>
        <input placeholder="id : test123" />
        <input placeholder="pw : test123password" />
        <div className="login-modal-button">
          <button>로그인</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}
