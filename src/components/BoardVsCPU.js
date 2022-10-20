import React, { useCallback, useContext, useEffect } from 'react';
import '../styles/Board.scss';
import Cell from './Cell';
import checkWinner from '../utils/checkWinner';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import useCpuMove from '../hooks/useCpuMove';
import delay from '../utils/delay';

export default function BoardVsCPU() {

    const {
        turn,
        setTurn,
        board,
        setBoard,
        isWinner,
        setIsWinner,
        setFinishedGame,
        boardRef
    } = useContext(GameContext);

    const { player1, player2 } = useContext(GameConfigContext);

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
        setFinishedGame();
    }, [isWinner, setFinishedGame]);

    return (
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
    )
}
