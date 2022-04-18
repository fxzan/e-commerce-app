import React from "react";
import './InfoModal.css';

function InfoModal(props) {
    return <div className="info-modal">
        <p>{props.message}</p>
        <button className="btn-white" onClick={props.onClose}>Close</button>
    </div>
}

export default InfoModal;