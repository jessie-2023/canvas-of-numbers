import { Link } from 'react-router-dom';
import './Navbar.scss';

// Use .module.scss if you're doing CSS modules

export default function NavbarTop() {
  return (
    <header className="canvas-header">
      <nav className="navbar navbar-expand-lg navbar-light px-3">
        <Link to="/" className="navbar-brand">
          Canvas of Numbers
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/questions" className="nav-link">
                Questions
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/upload" className="nav-link">
                Upload
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
