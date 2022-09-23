import React, { useContext, useEffect, useState } from 'react';
import '../styles/Board.scss';
import Cell from './Cell';
import Popup from './Popup';
import PopupWinnerContent from './PopupWinnerContent';
import checkWinner from '../utils/checkWinner';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import delay from '../utils/delay';
import { SocketContext } from '../context/SocketContext';

export default function Board() {

    const {
        turn,
        setTurn,
        board,
        setBoard,
        isWinner,
        setIsWinner,
        score,
        setScore
    } = useContext(GameContext);

    const { playerMark, setPlayerMark, setGameType } = useContext(GameConfigContext);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [winnerClass, setWinnerClass] = useState(null);
    const [winnerRow, setWinnerRow] = useState([]);

    const {socket} = useContext(SocketContext);

    function handleOnClick(index) {
        if (isWinner || board[index] || turn !== playerMark) return;
        const newBoard = [...board];
        newBoard[index] = playerMark;
        const newTurn = turn === 'circle' ? 'cross' : 'circle';
        socket.emit('send-message', { newBoard, newTurn });
    }

    useEffect(() => {

        socket.on('board-update', ({ newBoard, newTurn }) => {
            setBoard(newBoard);
            setTurn(newTurn);
        });

        socket.on('reset', () => {
            setIsWinner(null);
            setBoard(() => Array(9).fill(null));
            setTurn('cross');
            setIsPopupOpen(false);
            setWinnerRow([]);
        });

    }, [setBoard, setTurn, socket, setIsWinner]);

    useEffect(() => {
        setIsWinner(checkWinner(board));
    }, [board, setIsWinner]);

    const setFinishedGame = async () => {
        if (!isWinner) return;

        await delay(500);
        setWinnerRow(isWinner.winnerRow);
        setWinnerClass(isWinner.winner);

        const newScore = { ...score };
        newScore[isWinner.winner] += 1;
        setScore(newScore);

        setIsWinner(null);
        await delay(1000);
        setIsPopupOpen(true);
    }

    useEffect(() => {
        setFinishedGame();
    });

    const handleQuit = () => {
        setGameType(null);
        setPlayerMark(null);
    }

    const handleNextRound = () => {
        socket.emit('reset');
    }

    return (
        <>
            <div className={`board ${playerMark}`}>
                {board.map((value, index) => {
                    let className = `cell ${value ? `cell--${value}` : ''}`;
                    className += winnerRow.includes(index) ? ' winner' : '';
                    return (
                        <Cell
                            key={index}
                            onClick={() => handleOnClick(index)}
                            className={className}
                        />
                    )
                })}
            </div>
            <Popup className={`popup ${isPopupOpen ? 'show' : ''}`}>
                <PopupWinnerContent winner={winnerClass} handleQuit={handleQuit} handleNextRound={handleNextRound} />
            </Popup>
        </>
    )
}