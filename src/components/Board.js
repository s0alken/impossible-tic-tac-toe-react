import React, { useCallback, useContext, useEffect, useState } from 'react';
import '../styles/Board.scss';
import Cell from './Cell';
import Popup from './Popup';
import PopupWinnerContent from './PopupWinnerContent';
import checkWinner from '../utils/checkWinner';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import useCpuMove from '../hooks/useCpuMove';
import delay from '../utils/delay';

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

    const { player1, player2, setPlayerMark, setGameType } = useContext(GameConfigContext);

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [winnerClass, setWinnerClass] = useState(null);
    const [winnerRow, setWinnerRow] = useState([]);

    const { getMove } = useCpuMove();

    function handleOnClick(index) {
        if (isWinner || board[index] || turn !== player1) return;
        const newBoard = [...board];
        newBoard[index] = player1;
        setBoard(newBoard);
        setTurn(turn === 'circle' ? 'cross' : 'circle');
    }

    const makeCpuMove = useCallback(async () => {
        if (isWinner) return;
        const newBoard = [...board];
        const cpuMove = getMove([...newBoard]);
        newBoard[cpuMove] = player2;
        await delay(700);
        setBoard(newBoard);
        setTurn(turn === 'circle' ? 'cross' : 'circle');
    }, [board, setBoard, getMove, isWinner, player2, turn, setTurn]);

    useEffect(() => {
        if (!checkWinner(board) && turn === player2) makeCpuMove();
    }, [makeCpuMove, player2, turn, board]);

    useEffect(() => {
        setIsWinner(checkWinner(board));
    }, [board, setIsWinner]);

    const setNextGame = async () => {
        if (!isWinner) return;
        const newScore = { ...score };
        newScore[isWinner.winner] += 1;
        setScore(newScore);
        setWinnerRow(isWinner.winnerRow);
        setWinnerClass(isWinner.winner);
        setIsWinner(null);
        await delay(1000);
        setIsPopupOpen(true);
    }

    useEffect(() => {
        setNextGame();
    });

    const handleQuit = () => {
        setGameType(null);
        setPlayerMark(null);
    }

    const handleNextRound = () => {
        setIsWinner(null);
        setBoard(() => Array(9).fill(null));
        setTurn('cross');
        setIsPopupOpen(false);
        setWinnerRow([]);
    }

    return (
        <>
            <div className={`board ${turn}`}>
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
