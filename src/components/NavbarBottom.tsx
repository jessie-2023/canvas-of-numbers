import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import './Navbar.scss';

export default function NavbarBottom() {
  return (
    <footer className="canvas-footer mt-5 py-4">
      <div className="container text-center">
        <p className="footer-title mb-1">Canvas of Numbers</p>

        <ul className="footer-links list-inline">
          <li className="list-inline-item">
            <Link to="/about">About</Link>
          </li>
          <li className="list-inline-item">
            <Link to="/upload">Upload a Dataset</Link>
          </li>
          <li className="list-inline-item">
            <Link to="/terms">Terms</Link>
          </li>
        </ul>

        <div className="footer-icons my-2">
          <a href="https://github.com/jxevergrow" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/jiaxinxie2025/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="https://jxevergrow.github.io" target="_blank" rel="noopener noreferrer" aria-label="Personal Website">
            <FaGlobe />
          </a>
        </div>

        <p className="small text-muted">© {new Date().getFullYear()} Jiaxin Xie. All rights reserved.</p>
      </div>
    </footer>
  );
}
