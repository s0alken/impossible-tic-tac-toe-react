import React, { useState } from 'react';
import Button from './Button';
import '../styles/Menu.scss';
import logo from '../assets/logo.svg';

export default function Menu({ setGameType, setPlayerMark }) {
    const [selectedPlayerMark, setSelectedPlayerMark] = useState('circle');
    const [selectedGameType, setSelectedGameType] = useState('cpu');

    const isRadioSelected = value => selectedPlayerMark === value;

    function handleSubmit(e) {
        e.preventDefault();

        setPlayerMark(selectedPlayerMark);
        setGameType(selectedGameType);
    }

    return (
        <form className="menu" onSubmit={handleSubmit}>
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
                    type="submit"
                    className="btn btn-lg btn--yellow"
                    value="cpu"
                    name="game_type"
                    onClick={e => {setSelectedGameType(e.target.value)}}
                >
                    New Game (vs CPU)
                </Button>
                <Button
                    type="submit"
                    className="btn btn-lg btn--cyan"
                    value="player"
                    name="game_type"
                    onClick={e => setSelectedGameType(e.target.value)}
                >
                    New Game (vs player)
                </Button>
            </div>
        </form>
    )
}