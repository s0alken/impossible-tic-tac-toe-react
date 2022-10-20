import React, { useContext, useEffect } from 'react';
import '../styles/Board.scss';
import Cell from './Cell';
import checkWinner from '../utils/checkWinner';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import { useSocket } from '../context/SocketProvider';

export default function BoardVsPlayer() {

    const {
        turn,
        setTurn,
        board,
        setBoard,
        isWinner,
        setIsWinner,
        handleRestartGame,
        setFinishedGame,
        boardRef,
        setIsPopupResultOpen,
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

    }, [handleRestartGame, setBoard, setIsPopupResultOpen, setIsWinner, setTurn, socket, setNextRound]);

    useEffect(() => {
        if (!isWinner) return;
        setFinishedGame();
    }, [isWinner, setFinishedGame]);

    return (
        <div ref={boardRef} className={`board ${playerMark} ${playerMark === turn ? 'my-turn' : ''}`}>
            {board.map((value, index) => {
                return (
                    <Cell
                        key={index}
                        onClick={() => handleOnClick(index)}
                        className={`cell ${value ? `cell--${value}` : ''}`}
                    />
                )
            })}
        </div>
    )
}