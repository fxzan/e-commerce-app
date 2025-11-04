import React, {useState, useEffect, useRef} from "react";
import './InfoModal.css';

function InfoModal(props) {
    const [clicked, setClicked] = useState(false)
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            setClicked(true);
            props.onClose();
          }
        }
    
        if (!clicked) {
          document.addEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [clicked, props.onClose]);
      
    return (
        <div className="info-modal-backdrop">
            <div className="info-modal" ref={modalRef}>
                <div className="message-content"><p>{props.message}</p></div>
                <button className="action-button secondary-button" onClick={props.onClose}>Close</button>
            </div>
        </div>
    )
}

export default InfoModal;