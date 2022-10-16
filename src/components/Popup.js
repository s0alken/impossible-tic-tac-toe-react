import React from 'react';
import '../styles/Popup.scss';

export default function Popup({ show, children, ...props }) {

    return (
        <div className={`popup ${show ? 'show' : ''}`} {...props}>
            <div className="popup__content">
                {children}
            </div>
        </div>
    )
}
