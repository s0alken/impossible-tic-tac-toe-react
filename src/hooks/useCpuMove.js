import { useContext } from 'react';
import { GameTypeContext } from '../context/GameTypeContext';
import checkWinner from '../utils/checkWinner';

export default function useCpuMove() {
    const { player1, player2 } = useContext(GameTypeContext);

    const getMove = board => {

        if(board.every(cell => !cell)) return 4;

        let bestScore = -Infinity;
        let moveIndex;

        for (let i = 0; i < board.length; i++) {
            if (!board[i]) {
                board[i] = player2;
                let score = minimax([...board], false, 1);
                board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    moveIndex = i;
                }
            }
        }

        return moveIndex;
    }

    const scores = {
        cross: 'cross' === player1 ? -10 : 10,
        circle: 'circle' === player1 ? -10 : 10,
        tie: 0
    }

    const getScore = (winner, deph) => {
        if (winner === player1) return scores[winner] + deph;
        if (winner === player2) return scores[winner] - deph;
        return scores[winner];
    }

    const minimax = (board, isMaximizing, deph) => {
        const result = checkWinner([...board]);

        if (result) return getScore(result, deph);

        if (isMaximizing) {
            let bestScore = -Infinity;

            for (let i = 0; i < board.length; i++) {
                if (!board[i]) {
                    board[i] = player2;
                    bestScore = Math.max(minimax([...board], false, deph + 1), bestScore);
                    board[i] = null;
                }
            }

            return bestScore;

        } else {
            let bestScore = Infinity;

            for (let i = 0; i < board.length; i++) {
                if (!board[i]) {
                    board[i] = player1;
                    bestScore = Math.min(minimax([...board], true, deph + 1), bestScore);
                    board[i] = null;
                }
            }

            return bestScore;

        }
    }

    return { getMove };
}
