import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-title">The Band</div>
      <div className="footer-icons">
        <a href="https://www.youtube.com" target="_blank" rel="noreferrer">
          <img
            src="https://prasadyash2411.github.io/ecom-website/img/6260efc8fc9a9002669d2f4ad9956cc0.jpg"
            alt="Youtube"
          />
        </a>
        <a href="https://www.spotify.com" target="_blank" rel="noreferrer">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Spotify_logo_without_text.svg/2048px-Spotify_logo_without_text.svg.png"
            alt="Spotify"
          />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <img
            src="https://cdn3.iconfinder.com/data/icons/capsocial-round/500/facebook-512.png"
            alt="Facebook"
          />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
