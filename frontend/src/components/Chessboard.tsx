import { Chess, Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../screens/Game";

// export const MOVE = "move"
export const ChessBoard = ({ board, socket, color, setBoard, chess }: {
    board: ({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][],
    socket: WebSocket, color: string | null, setBoard: React.Dispatch<React.SetStateAction<({
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null)[][]>>, chess: Chess
}) => {
    color = color?.[0] ?? null;

    const [from, setFrom] = useState<Square | null>(null);

    const handleClick = (cell: {
        square: Square;
        type: PieceSymbol;
        color: Color;
    } | null, i: number, j: number) => {
        console.log(from);
        if (!from && cell && cell.color === color) {
            setFrom(cell.square);
            console.log(cell.square);
            return;
        }
        else if (from) {
            const to = String.fromCharCode(97 + j) + (8 - i + 1);
            const move = {
                from,
                to
            }
            socket?.send(JSON.stringify({
                type: MOVE,
                move
            }));
            chess.move(move);
            setBoard(chess.board());
            setFrom(null);
        }
    }

    return (<div className="text-white-200">
        {board.map((row, i) => {
            return <div key={i} className="flex">
                {row.map((square, j) => {
                    return <div key={j} onClick={() => handleClick(square, i + 1, j)} className={`w-16 h-16 flex justify-center items-center hover:bg-select ${(i + j) % 2 == 0 ? 'bg-bc' : 'bg-lightgreen'} ${from===square?.square?'bg-select':""}`}>
                        {square ? <img src={`/assets/${square.color}${square.type}.png`}></img> : ""}
                    </div>
                })}
            </div>
        })}
    </div>)
}