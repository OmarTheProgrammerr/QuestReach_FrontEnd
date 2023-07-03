// Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h3 className="footer-links">
          <Link to="/">Quest Reach</Link>
        </h3>
        <ul className="footer-links">
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/privacy-policy">Privacy Policy</Link>{" "}
            {/* Update this line */}
          </li>
          <li>
            <Link to="/terms-and-conditions">Terms & Conditions</Link>{" "}
            {/* Update this line */}
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
