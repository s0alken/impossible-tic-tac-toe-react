import React, { useCallback, useContext, useEffect, useState, useRef } from 'react';
import '../styles/Board.scss';
import Cell from './Cell';
import Popup from './Popup';
import PopupResult from './PopupResult';
import checkWinner from '../utils/checkWinner';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import useCpuMove from '../hooks/useCpuMove';
import delay from '../utils/delay';

export default function BoardVsCPU() {

    const boardRef = useRef();

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

    const { player1, player2, setPlayerMark, setGameType, setDifficulty } = useContext(GameConfigContext);

    const [isPopupResultOpen, setIsPopupResultOpen] = useState(false);
    const [winnerClass, setWinnerClass] = useState(null);

    const getMove = useCpuMove();

    const handleOnClick = index => {
        if (isWinner || board[index] || turn !== player1) return;
        const newBoard = [...board];
        newBoard[index] = player1;
        setBoard(newBoard);
        setTurn(turn === 'circle' ? 'cross' : 'circle');
        setIsWinner(checkWinner(newBoard));
    }

    const makeCpuMove = useCallback(async () => {
        if (isWinner) return;
        const newBoard = [...board];
        const cpuMove = getMove([...newBoard]);
        newBoard[cpuMove] = player2;
        await delay(700);
        setBoard(newBoard);
        setTurn(turn === 'circle' ? 'cross' : 'circle');
        setIsWinner(checkWinner(newBoard));
    }, [board, setBoard, getMove, isWinner, player2, turn, setTurn, setIsWinner]);

    useEffect(() => {
        if (!checkWinner(board) && turn === player2) makeCpuMove();
    }, [makeCpuMove, player2, turn, board]);

    useEffect(() => {

        if (!isWinner) return;

        const setFinishedGame = async () => {
            const { winner, winnerRow } = isWinner;

            const cells = boardRef.current.querySelectorAll('.cell');

            const winnerCells = [cells[winnerRow[0]], cells[winnerRow[1]], cells[winnerRow[2]]];

            for (let i = 0; i < winnerCells.length; i++) {
                await delay(400); 
                winnerCells[i].classList.add("winner");
            }

            await delay(winner === 'tie' ? 100 : 800);

            const newScore = { ...score };
            newScore[winner] += 1;

            setScore(newScore);
            setWinnerClass(winner); 
            setIsPopupResultOpen(true);
            setIsWinner(null);
        };

        setFinishedGame();

    }, [isWinner, score, setIsWinner, setScore]);

    const handleQuit = () => {
        setGameType(null);
        setPlayerMark(null);
        setDifficulty(null)
    }

    const handleNextRound = () => {
        setIsWinner(null);
        setBoard(() => Array(9).fill(null));
        setTurn('cross');
        setIsPopupResultOpen(false);
    }

    return (
        <>
            <div ref={boardRef} className={`board ${player1} ${player1 === turn ? 'my-turn' : ''}`}>
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
            <Popup show={isPopupResultOpen}>
                <PopupResult winner={winnerClass} handleQuit={handleQuit} handleNextRound={handleNextRound} />
            </Popup>
        </>
    )
}
