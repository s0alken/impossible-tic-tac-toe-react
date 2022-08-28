export default function isAvailableCells(board) {
    return board.some(cell => !cell);
}