import React, { useState } from 'react';
import Button from './Button';
import '../styles/Menu.scss';
import logo from '../assets/logo.svg';
import Popup from './Popup';
import PopupSelectDifficulty from './PopupSelectDifficulty';
import uniqid from 'uniqid';
import PopupJoinRoom from './PopupJoinRoom';

export default function Menu({ setGameType, setPlayerMark, setDifficulty, setRoomId, scoreLabels, setScoreLabels }) {

    const [selectedPlayerMark, setSelectedPlayerMark] = useState('circle');
    const [isPopupSelectDifficultyOpen, setIsPopupSelectDifficultyOpen] = useState(false);
    const [isPopupJoinRoomOpen, setIsPopupJoinRoomOpen] = useState(false);
    const [manualRoomId, setManualRoomId] = useState("");

    const isRadioSelected = value => selectedPlayerMark === value;

    const openDifficultyPopup = event => {
        event.preventDefault();

        setIsPopupSelectDifficultyOpen(true);
    }

    const openRoomPopup = event => {
        event.preventDefault();

        setIsPopupJoinRoomOpen(true);
    }

    const handleVsCPUSubmit = difficulty => {
        setGameType('cpu');
        setPlayerMark(selectedPlayerMark);
        setDifficulty(difficulty);

        const newScoreLabels = {};
        const opponentPlayerMark = selectedPlayerMark === 'cross' ? 'circle' : 'cross';

        newScoreLabels[selectedPlayerMark] = 'you';
        newScoreLabels[opponentPlayerMark] = 'cpu';

        setScoreLabels(newScoreLabels);
    }

    const handleVsPlayerSubmit = () => {
        if(!manualRoomId) return;
        setGameType('player');
        setPlayerMark(selectedPlayerMark);
        setRoomId(manualRoomId);
    }

    const createRoomId = () => {
        setGameType('player');
        setPlayerMark(selectedPlayerMark);
        setRoomId(uniqid());

        const newScoreLabels = {};
        const opponentPlayerMark = selectedPlayerMark === 'cross' ? 'circle' : 'cross';

        newScoreLabels[selectedPlayerMark] = 'p1';
        newScoreLabels[opponentPlayerMark] = 'p2';

        setScoreLabels(newScoreLabels);
    }

    return (
        <>
            <form className="menu fadeInUp">
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
                    <Button className="btn btn-lg btn--yellow" onClick={openDifficultyPopup}>New Game (vs CPU)</Button>
                    <Button className="btn btn-lg btn--cyan" onClick={openRoomPopup}>New Game (vs player)</Button>
                </div>
            </form>

            <Popup show={isPopupSelectDifficultyOpen} setIsPopupOpen={setIsPopupSelectDifficultyOpen} closable>
                <PopupSelectDifficulty
                    handleVsCPUSubmit={handleVsCPUSubmit}
                />
            </Popup>

            <Popup show={isPopupJoinRoomOpen} setIsPopupOpen={setIsPopupJoinRoomOpen} closable>
                <PopupJoinRoom
                    createRoomId={createRoomId}
                    setManualRoomId={setManualRoomId}
                    handleVsPlayerSubmit={handleVsPlayerSubmit}
                />
            </Popup>
        </>

    )
}