import React from 'react';
import { useState, useEffect, useContext } from 'react';
import '../styles/Room.scss';
import Game from './Game';
import { io } from 'socket.io-client';
import { GameConfigContext } from '../context/GameConfigContext';

export default function Room({roomId}) {

    const [oponentConnected, setOponentConnected] = useState(false);
    const [socket, setSocket] = useState();

    const { playerMark, setPlayerMark } = useContext(GameConfigContext);

    useEffect(() => {
        const newSocket = io('http://localhost:5000/');
        setSocket(newSocket);
    }, [])

    useEffect(() => {
        if (socket == null) return;

        if(roomId) {
            socket.emit('oponent-ready');
        }

        socket.on('oponent-connected', () => {
            socket.emit('set-oponent-mark', playerMark === 'cross' ? 'circle' : 'cross');
            setOponentConnected(true);
        });

        socket.on('oponent-mark-ready', oponentMark => {
            console.log("setiao", oponentMark);
            setPlayerMark(oponentMark);
            setOponentConnected(true);
        });

    }, [socket, roomId, playerMark, setPlayerMark]);

    if (oponentConnected) {
        return <Game />
    }

    return (
        <div className='room'>
            <h1 className='heading-lg popup__heading--tie'>Your Room ID is 123131</h1>
            <p className='heading-xs popup__heading--tie'>Waiting for your oponent...</p>
        </div>
    )
}
