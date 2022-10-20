import React, { useContext, useEffect, useState } from 'react';
import '../styles/Board.scss';
import Cell from './Cell';
import Popup from './Popup';
import PopupResult from './PopupResult';
import checkWinner from '../utils/checkWinner';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import delay from '../utils/delay';
import { useSocket } from '../context/SocketProvider';

export default function BoardVsPlayer() {

    const {
        turn,
        setTurn,
        board,
        setBoard,
        isWinner,
        setIsWinner,
        score,
        setScore,
        handleRestartGame
    } = useContext(GameContext);

    const { playerMark, setPlayerMark, setGameType } = useContext(GameConfigContext);

    const [isPopupResultOpen, setIsPopupResultOpen] = useState(false);
    const [winnerClass, setWinnerClass] = useState(null);
    const [winnerRow, setWinnerRow] = useState([]);

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
            setIsWinner(null);
            setBoard(Array(9).fill(null));
            setTurn('cross');
            setIsPopupResultOpen(false);
            setWinnerRow([]);
        });

        socket.on('game-restart', () => {
            handleRestartGame();
        });

    }, [setBoard, setTurn, socket, setIsWinner, setScore, handleRestartGame]);

    useEffect(() => {

        if (!isWinner) return;

        const setFinishedGame = async () => {
            const { winner, winnerRow } = isWinner;

            await delay(500);
            setWinnerRow(winnerRow);
            setWinnerClass(winner);

            const newScore = { ...score };
            newScore[winner] += 1;
            setScore(newScore);

            setIsWinner(null);

            await delay(winner === 'tie' ? 100 : 1000);

            setIsPopupResultOpen(true);
        };

        setFinishedGame();

    }, [isWinner, score, setIsWinner, setScore]);

    const handleQuit = () => {
        setGameType(null);
        setPlayerMark(null);
    }

    const handleNextRound = () => {
        socket.emit('next-round');
    }

    return (
        <>
            <div className={`board ${playerMark} ${playerMark === turn ? 'my-turn' : ''}`}>
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
            <Popup show={isPopupResultOpen}>
                <PopupResult winner={winnerClass} handleQuit={handleQuit} handleNextRound={handleNextRound} />
            </Popup>
        </>
    )
}