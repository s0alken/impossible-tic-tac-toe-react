import React from 'react';
import '../styles/Popup.scss';

export default function Popup({ show, children }) {

    /* return (
        <div {...props}>{children}</div>
    ) */

    return (
        <div className={`popup ${show ? 'show' : ''}`}>
            <div className="popup__content">
                {children}
            </div>
        </div>
    )
}
