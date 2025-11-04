import React from "react";
import { NavLink } from "react-router-dom";
import Tours from "../components/Tours/Tours";
import "./Home.css";

function Home() {
  return (
    <>
      <div className="hero-section">
        <h1>We are <span>ReactBand</span></h1>
        <p>ReactBand: Killer hooks. Big choruses. Pure joy.</p>
      </div>
      <div className="latest-album">
        <NavLink to="/e-commerce-app/about">
          <button className="action-button">About Us</button>
        </NavLink>
        <a href="https://spotify.com" target="_blank" rel="noreferrer">
          <button className="action-button secondary-button">▶</button>
        </a>
      </div>
      <Tours />
    </>
  );
}

export default Home;
