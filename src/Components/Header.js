import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import "./Header.css";
import { RxDoubleArrowDown } from "react-icons/rx";
import { GoArrowUpLeft } from "react-icons/go";
import { Link } from "react-scroll";

const Header = () => {
  const [showArrow, setShowArrow] = useState(true);

  const [text, setText] = useState("");
  const message = "Scan, Connect, Accelerate!";
  const speed = 100; // time delay of print out
  const [logoColor, setLogoColor] = useState("white");

  useEffect(() => {
    if (text.length < message.length) {
      setTimeout(() => {
        setText(message.substr(0, text.length + 1));
      }, speed);
    }
  }, [text]);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 50) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener("scroll", checkScroll);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <div className="background">
      <header className="header">
        <div className="logo">Quest Reach</div>
        <nav>
          <Link
            activeClass="active"
            to="body"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            className="header-link"
            onMouseEnter={() => setLogoColor("black")}
            onMouseLeave={() => setLogoColor("white")}
          >
            <GoArrowUpLeft size={25} color={logoColor} className="GSArrow" />
            Get Started
          </Link>
        </nav>
      </header>
      <div className="typing-text">
        <h1>{text}</h1>
      </div>
      <div
        className="arrow-animation"
        style={{ display: showArrow ? "block" : "none" }}
      >
        <RxDoubleArrowDown size={35} color="black" />
      </div>
    </div>
  );
};

export default Header;
