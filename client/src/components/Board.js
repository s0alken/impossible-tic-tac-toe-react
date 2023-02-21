import React, { useContext } from 'react';
import '../styles/Board.scss';
import Cell from './Cell';
import { GameContext } from '../context/GameContext';
import { GameConfigContext } from '../context/GameConfigContext';

export default function Board({handleOnClick}) {

    const { turn, board, boardRef } = useContext(GameContext);

    const { playerMark } = useContext(GameConfigContext);

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