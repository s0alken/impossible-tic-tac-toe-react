import React from 'react';
import '../styles/Button.scss';

export default function Button({children, ...props}) {
  return (
    <button {...props}>{children}</button>
  )
}