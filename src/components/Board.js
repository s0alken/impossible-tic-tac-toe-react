import React, { useCallback, useContext, useEffect, useState } from 'react';
import Cell from './Cell';
import Popup from './Popup';
import checkWinner from '../utils/checkWinner';
import '../styles/Board.scss';
import { GameContext } from '../context/GameContext';
import { GameTypeContext } from '../context/GameTypeContext';
import useCpuMove from '../hooks/useCpuMove';
import delay from '../utils/delay';
import icon_o from '../assets/icon-o.svg';
import icon_x from '../assets/icon-x.svg';
import Button from './Button';

export default function Board() {

    const [board, setBoard] = useState(() => Array(9).fill(null));
    const [isWinner, setIsWinner] = useState(null);

    const { turn, setTurn } = useContext(GameContext);
    const { player1, player2, setPlayerMark, setGameType } = useContext(GameTypeContext);

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
        await delay(500);
        setBoard(newBoard);
        setTurn(turn === 'circle' ? 'cross' : 'circle');
    }, [board, getMove, player2, setTurn, turn, isWinner]
    )

    useEffect(() => {
        if (turn === player2) makeCpuMove();
    }, [makeCpuMove, player2, turn]);

    useEffect(() => {
        setIsWinner(checkWinner(board));
    }, [board])

   /*  useEffect(() => {
        console.log(isWinner);
    }, [isWinner]); */

    //testing
    
    function handleQuit() {
        setGameType(null);
        setPlayerMark(null);
    }

    function handleNextRound() {
        setIsWinner(null);
        setBoard(() => Array(9).fill(null));
        setTurn('cross');
    }

    return (
        <>
            <div className={`board ${turn}`}>
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
            <Popup
                winner={isWinner}
                player1={player1}
                className={`popup ${isWinner ? 'show' : ''}`}
            >
                <p className="popup__result heading-xs">
                    {isWinner === player1 ? 'You won!' : 'Oh no, you lost!'}
                </p>
                <h1 className={`popup__heading heading-lg popup__heading--${isWinner}`}>
                    <img src={isWinner === 'circle' ? icon_o : icon_x} alt="Cross Logo" className="popup__heading-icon" />
                    Takes the round
                </h1>
                <div className="popup__options">
                    <Button className="btn btn-md btn--silver" onClick={handleQuit}>Quit</Button>
                    <Button className="btn btn-md btn--yellow btn-next-round" onClick={handleNextRound}>Next round</Button>
                </div>
            </Popup>
        </>
    )
}
