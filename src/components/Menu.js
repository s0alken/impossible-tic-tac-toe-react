import React, { useState } from 'react';
import Button from './Button';
import '../styles/Menu.scss';
import logo from '../assets/logo.svg';
import Popup from './Popup';

export default function Menu({ setGameType, setPlayerMark, setDifficulty, setRoomId, roomId }) {
    const [selectedPlayerMark, setSelectedPlayerMark] = useState('circle');

    const [isDifficultyPopupOpen, setIsDifficultyPopupOpen] = useState(false);
    const [isRoomPopupOpen, setIsRoomPopupOpen] = useState(false);

    const isRadioSelected = value => selectedPlayerMark === value;

    const openDifficultyPopup = event => {
        event.preventDefault();

        setIsDifficultyPopupOpen(true);
    }

    const openRoomPopup = event => {
        event.preventDefault();

        setIsRoomPopupOpen(true);
    }

    const handleCPUSubmit = difficulty => {
        console.log(selectedPlayerMark)
        setGameType('cpu');
        setPlayerMark(selectedPlayerMark);
        setDifficulty(difficulty);
    }

    const handlePlayerSubmit = () => {
        if(!roomId) return;

        setGameType('player');
        setPlayerMark(selectedPlayerMark);
    }

    const createRoom = () => {
        setGameType('player');
        setPlayerMark(selectedPlayerMark);
    }

    const handleInputChange = event => {
        setRoomId(event.target.value);
    }

    return (
        <>
            <form className="menu">
                <div className="menu__logo">
                    <img src={logo} alt="Logo" />
                </div>

                <div className="menu__player-mark">
                    <h1 className="menu__heading heading-xs">Pick player 1's mark</h1>
                    <div className="menu__radio-wrapper">
                        <div className="menu__radio-container">
                            <input
                                type="radio"
                                className="radio radio-cross"
                                id="radio-cross"
                                name="player_mark"
                                value="cross"
                                checked={isRadioSelected('cross')}
                                onChange={e => setSelectedPlayerMark(e.target.value)}
                            />
                            <label htmlFor="radio-cross" className="radio__label radio__label--cross">
                                <i className="radio__icon radio__icon--cross"></i>
                            </label>
                            <input
                                type="radio"
                                className="radio radio-circle"
                                id="radio-circle"
                                name="player_mark"
                                value="circle"
                                checked={isRadioSelected('circle')}
                                onChange={e => setSelectedPlayerMark(e.target.value)}
                            />
                            <label htmlFor="radio-circle" className="radio__label radio__label--circle">
                                <i className="radio__icon radio__icon--circle"></i>
                            </label>
                            <div className="radio__slider"></div>
                        </div>
                    </div>
                    <p className="menu__note">Remember : X goes first</p>
                </div>

                <div className="menu__options">
                    <Button
                        className="btn btn-lg btn--yellow"
                        onClick={openDifficultyPopup}
                    >
                        New Game (vs CPU)
                    </Button>
                    <Button
                        className="btn btn-lg btn--cyan"
                        onClick={openRoomPopup}
                    >
                        New Game (vs player)
                    </Button>
                </div>
            </form>
            <Popup className={`popup ${isDifficultyPopupOpen ? 'show' : ''}`}>
                <div className="popup__menu">
                    <p className="popup__heading heading-md popup__heading--tie">
                        Select a difficulty level
                    </p>
                    <div className='popup__menu-container'>
                        <Button className="btn btn-lg btn--silver" onClick={() => handleCPUSubmit('easy')}>Easy</Button>
                        <Button className="btn btn-lg btn--silver" onClick={() => handleCPUSubmit('medium')}>Medium</Button>
                        <Button className="btn btn-lg btn--silver" onClick={() => handleCPUSubmit('hard')}>Hard</Button>
                        <Button className="btn btn-lg btn--silver" onClick={() => handleCPUSubmit('impossible')}>Impossible</Button>
                    </div>
                </div>
            </Popup>
            <Popup className={`popup ${isRoomPopupOpen ? 'show' : ''}`}>
                <div className='popup__menu'>
                    <Button className="btn btn-lg btn--silver" onClick={() => createRoom()}>Create a Room</Button>
                    <p className="popup__heading heading-sm popup__heading--tie" style={{ marginTop: '30px' }}>
                        Or enter a Room ID
                    </p>
                    <input
                        type="text"
                        onChange={handleInputChange}
                        value={roomId}
                    />
                    <Button
                        className="btn btn-lg btn--yellow"
                        style={{ marginTop: '30px' }}
                        onClick={handlePlayerSubmit}
                    >
                        Enter
                    </Button>
                </div>
            </Popup>
        </>

    )
}