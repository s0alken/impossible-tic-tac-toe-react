import React from 'react';
import '../styles/Popup.scss';

export default function Popup({ show, closable, setIsPopupOpen, children }) {

    const closePopup = event => {
        if(closable && event.target.classList.contains('popup')) {
            setIsPopupOpen(false);
        }
    }

    return (
        <div className={`popup ${show ? 'show' : ''}`} onClick={closePopup}>
            <div className="popup__content fillInLeft">
                {children}
            </div>
        </div>
    )
}
