import React, { useContext, useEffect } from 'react';
import checkWinner from '../utils/checkWinner';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import { useSocket } from '../context/SocketProvider';
import Board from './Board';

export default function BoardVsPlayer() {

    const {
        turn,
        setTurn,
        board,
        setBoard,
        isWinner,
        setIsWinner,
        handleRestartGame,
        setNextRound
    } = useContext(GameContext);

    const { playerMark } = useContext(GameConfigContext);

    const socket = useSocket();

    const handleOnClick = index => {
        if (isWinner || board[index] || turn !== playerMark) return;
        const newBoard = [...board];
        newBoard[index] = playerMark;
        const newTurn = turn === 'circle' ? 'cross' : 'circle';
        socket.emit('board-update', { newBoard, newTurn });
    }

    useEffect(() => {

        socket.on('board-update', ({ newBoard, newTurn }) => {
            setBoard(newBoard);
            setTurn(newTurn);
            setIsWinner(checkWinner(newBoard));
        });

        socket.on('next-round', () => {
            setNextRound();
        });

        socket.on('game-restart', () => {
            handleRestartGame();
        });

    }, [handleRestartGame, setBoard, setIsWinner, setNextRound, setTurn, socket]);

    <Board handleOnClick={handleOnClick} />
}