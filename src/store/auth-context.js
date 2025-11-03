import React from "react";
import { useHistory } from "react-router-dom";

const AuthContext = React.createContext({
  token: "",
  userID: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  userIdSet: () => {}
});

export function AuthContextProvider(props) {
  const history = useHistory();
  const inititalToken = localStorage.getItem("token");
  const [token, setToken] = React.useState(inititalToken);
  const [userID, setUserID] = React.useState(localStorage.getItem("userID"));
  const isLoggedIn = !!token;

  function loginHandler(newToken) {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    setToken(null);
    history.replace("/e-commerce-app/");
  }

  function userIdHandler(userID) {
    localStorage.setItem("userID", userID);
    setUserID(userID);
  }

  const contextValue = {
    token: token,
    userID: userID,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    userIdSet: userIdHandler
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
