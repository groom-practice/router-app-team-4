import { Link, Outlet, useNavigate } from "react-router-dom";
import "./index.css";

export default function MainLayout() {
  const navigate = useNavigate();
  return (
    <main>
      <header>
        <h1>POST PROJECT</h1>
      </header>
      <div className="main-content">
        <nav className="sideBar">
          <Link to="/">HOME</Link>
          <Link to={"/posts"}>POSTS</Link>
          <button onClick={() => navigate(-1)}>BACK</button>
        </nav>
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
