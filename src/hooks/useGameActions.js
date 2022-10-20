import { useContext } from 'react';
import { GameConfigContext } from '../context/GameConfigContext';
import { useSocket } from '../context/SocketProvider';
import delay from '../utils/delay';

function useGameActions(actionStates) {

    const {
        isWinner,
        setIsWinner,
        setBoard,
        setTurn,
        setScore,
        setIsPopupRestartOpen,
        setIsPopupResultOpen,
        score,
        setWinnerClass,
        boardRef
    } = actionStates;

    const { gameType, setGameType, setPlayerMark, setDifficulty } = useContext(GameConfigContext);

    const socket = useSocket();

    const restartGame = () => {
        if (gameType === 'player') {
            socket.emit('game-restart');
            return;
        }

        handleRestartGame();
    }

    const handleRestartGame = () => {
        setIsWinner(null);
        setBoard(() => Array(9).fill(null));
        setTurn('cross');
        setIsPopupRestartOpen(false);
        setScore({ cross: 0, tie: 0, circle: 0 });
    }

    const setFinishedGame = async () => {
        const { winner, winnerRow } = isWinner;

        if (winner !== 'tie') {
            const cells = boardRef.current.querySelectorAll('.cell');

            const winnerCells = [cells[winnerRow[0]], cells[winnerRow[1]], cells[winnerRow[2]]];

            for (let i = 0; i < winnerCells.length; i++) {
                await delay(400);
                winnerCells[i].classList.add("winner");
            }
        }

        await delay(700);

        const newScore = { ...score };
        newScore[winner] += 1;

        setScore(newScore);
        setWinnerClass(winner);
        setIsPopupResultOpen(true);
        setIsWinner(null);
    };

    const handleQuit = () => {
        setGameType(null);
        setPlayerMark(null);

        if (gameType === 'cpu') {
            setDifficulty(null);
        }
    }

    const handleNextRound = () => {
        if (gameType === 'player') {
            socket.emit('next-round');
            return;
        }

        setNextRound();
    }

    const setNextRound = () => {
        setIsWinner(null);
        setBoard(Array(9).fill(null));
        setTurn('cross');
        setIsPopupResultOpen(false);
    }

    return { restartGame, handleRestartGame, setFinishedGame, handleQuit, setNextRound, handleNextRound };
}

export default useGameActions;
