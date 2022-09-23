import React, { useState, useEffect, useContext } from 'react';
import '../styles/Room.scss';
import Game from './Game';
import { GameConfigContext } from '../context/GameConfigContext';
import { SocketContext } from '../context/SocketContext';

export default function Room({roomId}) {

    const [oponentConnected, setOponentConnected] = useState(false);
    const {socket, userId} = useContext(SocketContext);

    const { playerMark, setPlayerMark } = useContext(GameConfigContext);

    useEffect(() => {

        if(roomId) {
            socket.emit('oponent-ready');
        }

        socket.on('oponent-connected', () => {
            socket.emit('set-oponent-mark', playerMark === 'cross' ? 'circle' : 'cross');
            setOponentConnected(true);
        });

        socket.on('oponent-mark-ready', oponentMark => {
            setPlayerMark(oponentMark);
            setOponentConnected(true);
        });

    }, [socket, roomId, playerMark, setPlayerMark]);

    if (oponentConnected) {
        return <Game />
    }

    return (
        <div className='room'>
            <h1 className='heading-lg popup__heading--tie'>{`Your Room ID is ${userId}`}</h1>
            <p className='heading-xs popup__heading--tie'>Waiting for your oponent...</p>
        </div>
    )
}