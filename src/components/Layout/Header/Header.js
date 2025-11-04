import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import "./Header.css";
import AuthContext from "../../../store/auth-context";
import loginImg from "./login.png";
import logoutImg from "./logout.png";

const Header = (props) => {
  const location = useLocation();
  const authCtx = React.useContext(AuthContext);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <nav>
            <a className="logo" href="/e-commerce-app/home">ReactBand</a>
            <ul className="nav-links">
              <NavLink activeClassName="active" to="/e-commerce-app/home">
                <li>Home</li>
              </NavLink>
              <NavLink activeClassName="active" to="/e-commerce-app/store">
                <li>Store</li>
              </NavLink>
              <NavLink activeClassName="active" to="/e-commerce-app/about">
                <li>About</li>
              </NavLink>
              <NavLink activeClassName="active" to="/e-commerce-app/contact-us">
                <li>Contact Us</li>
              </NavLink>
            </ul>
          </nav>
          <div className="header-actions">
            <HeaderCartButton onClick={props.onShowCart} />
            {(!authCtx.isLoggedIn && location.pathname !== "/e-commerce-app/login") && (
              <NavLink activeClassName="active" to="/e-commerce-app/login">
                <img className="header-icon" src={loginImg} alt="Login"/>
              </NavLink>
            )}
            {authCtx.isLoggedIn && (
              <img className="header-icon" src={logoutImg} alt="Logout" onClick={authCtx.logout} />
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
