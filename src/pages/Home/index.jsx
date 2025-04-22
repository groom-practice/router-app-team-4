import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./index.css";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn"); // 로컬에서 상태 불러오기
    if (savedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (id, pw) => {
    if (id === "test123" && pw === "test123password") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 로컬에 저장
      setShowModal(false);
    } else {
      alert("아이디와 비밀번호를 화면에 보이는 예시대로 입력해주세요");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn"); // 로르아웃시 로컬에서 제거
  };

  return (
    <div className="home">
      <h3>{isLoggedin ? "반갑습니다!" : "Welcome To Main Page!"}</h3>
      {isLoggedin ? (
        <button onClick={handleLogout}> 로그아웃 </button>
      ) : (
        <button onClick={() => setShowModal(true)}>로그인</button>
      )}

      {showModal &&
        createPortal(
          <LoginModal
            onClose={() => setShowModal(false)}
            onLogin={handleLogin}
          />,
          document.body
        )}
    </div>
  );
}

// 로그인 모달
function LoginModal({ onClose, onLogin }) {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleIdChange = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const handlePwChange = (e) => {
    e.preventDefault();
    setPw(e.target.value);
  };

  const handleLoginClick = () => {
    onLogin(id, pw);
    setId("");
    setPw("");
  };

  return (
    <div className="login-modal">
      <div className="login-modal-content">
        <p> 화면에 보이는 예시대로 로그인 해주세요. </p>
        <input
          placeholder="id : test123"
          value={id}
          onChange={handleIdChange}
        />
        <input
          placeholder="pw : test123password"
          value={pw}
          onChange={handlePwChange}
        />
        <div className="login-modal-button">
          <button onClick={handleLoginClick}>로그인</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}
