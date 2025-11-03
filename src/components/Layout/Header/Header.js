import React from "react";
import { Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import "./Header.css";
import AuthContext from "../../../store/auth-context";

const Header = (props) => {
  const authCtx = React.useContext(AuthContext);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <nav>
            <ul>
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
          <Route path="/e-commerce-app/store">
            <HeaderCartButton onClick={props.onShowCart} />
          </Route>
          {!authCtx.isLoggedIn && (
            <NavLink activeClassName="active" to="/e-commerce-app/login">
              <h2 className="login">Login</h2>
            </NavLink>
          )}
          {authCtx.isLoggedIn && (
            <h2 className="logout" onClick={authCtx.logout}>
              Logout
            </h2>
          )}
        </div>
      </header>
      <div className="main">
        <h1>The Band</h1>
      </div>
    </>
  );
};

export default Header;
