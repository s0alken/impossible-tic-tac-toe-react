import React, { useCallback, useContext, useEffect } from 'react';
import checkWinner from '../utils/checkWinner';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';
import useCpuMove from '../hooks/useCpuMove';
import delay from '../utils/delay';
import Board from './Board';

export default function BoardVsCPU() {

    const {
        turn,
        setTurn,
        board,
        setBoard,
        isWinner,
        setIsWinner
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

    return <Board handleOnClick={handleOnClick} />
}
