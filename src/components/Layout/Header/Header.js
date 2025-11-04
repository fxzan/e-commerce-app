import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import HeaderCartButton from "./HeaderCartButton";
import "./Header.css";
import AuthContext from "../../../store/auth-context";
import loginImg from "./login.png";
import logoutImg from "./logout.png";

const Header = (props) => {
  const location = useLocation();
  const authCtx = React.useContext(AuthContext);

  const [open, setOpen] = useState(false)
  
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <nav ref={menuRef}>
            <div onClick={() => setOpen(!open)} className={open ? "burger active" : "burger"}>
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
            </div>
            <NavLink className="logo" to="/e-commerce-app/home">ReactBand</NavLink>
            <ul className={open ? "nav-links active" : "nav-links"}>
              <NavLink activeClassName="active" to="/e-commerce-app/home" onClick={() => setOpen(false)}>
                <li>Home</li>
              </NavLink>
              <NavLink activeClassName="active" to="/e-commerce-app/store" onClick={() => setOpen(false)}>
                <li>Store</li>
              </NavLink>
              <NavLink activeClassName="active" to="/e-commerce-app/about" onClick={() => setOpen(false)}>
                <li>About</li>
              </NavLink>
              <NavLink activeClassName="active" to="/e-commerce-app/contact-us" onClick={() => setOpen(false)}>
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
