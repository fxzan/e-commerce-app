import React from "react";

import Tours from "../components/Tours/Tours";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="latest-album">
        <a href="https://spotify.com" target="_blank" rel="noreferrer">
          <button className="latest-album-btn">Get our latest album</button>
        </a>
        <a href="https://spotify.com" target="_blank" rel="noreferrer">
          <button className="play-btn">▶</button>
        </a>
      </div>
      <Tours />
    </>
  );
}

export default Home;
