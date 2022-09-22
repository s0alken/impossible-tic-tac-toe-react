import React from 'react';
import '../styles/Popup.scss';

export default function Popup({ children, ...props }) {

    return (
        <div {...props}>{children}</div>
    )
}
