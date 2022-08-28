import React from 'react';
import '../styles/Popup.scss';

export default function Popup({ children, ...props }) {

    return (
        <div {...props}>
            <div className="popup__menu">
                {children}
            </div>
        </div>
    )
}
