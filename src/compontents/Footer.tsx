import "./Footer.css";
import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="Footer-container">
      <div>
        <p>wtw</p>
      </div>
      <div className="Footer-icons">
        <a href="https://www.facebook.com/WTWcorporate">
          <FaFacebook />
        </a>
        <a href="https://www.linkedin.com/company/wtwcorporate">
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/wtwcorporate">
          <FaInstagram />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
