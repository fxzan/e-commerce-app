import React from "react";
import ReactDOM from "react-dom";

import InfoModal from "../components/UI/InfoModal/InfoModal";

const InfoModalContext = React.createContext({
  message: null,
  isActive: false,
  showModal: (text) => {},
  closeModal: () => {},
});

export function InfoModalContextProvider(props) {
    const [message, setMessage] = React.useState(null);
    const isActive = !!message;

    function showInfoModalHandler(message) {
        setMessage(message);
    }

    function closeInfoModalHandler() {
        setMessage(null);
    }

  const infoModal = ReactDOM.createPortal(
    <InfoModal onClose={closeInfoModalHandler} message={`${message}`} />,
    document.getElementById("overlays")
    );
    
    const contextValue = {
        message: message,
        isActive: isActive,
        showModal: showInfoModalHandler,
        closeModal: closeInfoModalHandler
    }

  return (
      <InfoModalContext.Provider value={contextValue} >
      {isActive && infoModal}
      {props.children}
    </InfoModalContext.Provider>
  );
}

export default InfoModalContext;
