import React, { useState, useEffect, useContext } from 'react';
import '../styles/JoinRoom.scss';
import logo from '../assets/logo.svg';
import { useSocket } from '../context/SocketProvider';
import Game from './Game';
import { GameConfigContext } from '../context/GameConfigContext';

function JoinRoom({ roomId }) {

    const [opponentReady, setOpponentReady] = useState(false);

    const { playerMark, setPlayerMark, setScoreLabels } = useContext(GameConfigContext);

    const socket = useSocket();

    useEffect(() => {
        if (socket == null) return;

        socket.on("opponent-connected", () => {
            socket.emit('set-opponent-mark', playerMark === 'cross' ? 'circle' : 'cross');
        });

        socket.on('opponent-mark-ready', opponentMark => {

            const newScoreLabels = {};
            const player1Mark = opponentMark === 'cross' ? 'circle' : 'cross';

            newScoreLabels[opponentMark] = 'p2';
            newScoreLabels[player1Mark] = 'p1';

            setPlayerMark(opponentMark);
            setScoreLabels(newScoreLabels);

            socket.emit('opponent-ready');
        });

        socket.on('opponent-ready', () => {
            setOpponentReady(true);
        });
    })

    if (!opponentReady) {
        return (
            <div className="join-room">
                <div className="join-room__logo">
                    <img src={logo} alt="Logo" />
                </div>
                <h1 className="join-room__heading heading-lg">Your room id is {roomId}</h1>
                <div className="join-room__heading-loader">
                    <h1 className="heading-sm">Waiting for opponent to connect</h1>
                    <div className="loader">
                        <span className="loader__dot"></span>
                        <span className="loader__dot"></span>
                        <span className="loader__dot"></span>
                    </div>
                </div>
            </div>
        )
    }

    return <Game />
}

export default JoinRoom;