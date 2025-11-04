import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";
import spotify from "./spotify.png";
import facebook from "./fb.png";
import youtube from "./yt.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <NavLink to="/e-commerce-app/home" className="footer-title">ReactBand</NavLink>
        <div className="footer-icons">
          <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
            <img
              src={youtube}
              alt="Youtube"
            />
          </a>
          <a href="https://www.spotify.com" target="_blank" rel="noreferrer">
            <img
              src={spotify}
              alt="Spotify"
            />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <img
              src={facebook}
              alt="Facebook"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
