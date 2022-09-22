import React, { useContext, useState } from 'react';
import '../styles/Header.scss';
import logo from '../assets/logo.svg';
import icon_restart from '../assets/icon-restart.svg';
import Button from './Button';
import Popup from './Popup';
import PopupRestartContent from './PopupRestartContent';
import { GameContext } from '../context/GameContext';

export default function Header() {
    const { turn } = useContext(GameContext);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    return (
        <>
            <div className="header">
                <img src={logo} alt="Logo" className="header__logo" />
                <div className="header__turn heading-xs">
                    <i className={`header__turn-icon header__turn-icon--${turn}`}></i> TURN
                </div>
                <div className="header__button-container">
                    <Button className="btn btn-md btn--silver restart btn-restart" onClick={() => setIsPopupOpen(true)}>
                        <img src={icon_restart} alt="Restart" className="btn__icon" />
                    </Button>
                </div>
            </div>
            <Popup className={`popup ${isPopupOpen ? 'show' : ''}`}>
                <PopupRestartContent setIsPopupOpen={setIsPopupOpen} />
            </Popup>
        </>
    )
}
