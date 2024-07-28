import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { ChessBoard } from "../components/Chessboard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from 'chess.js'

export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

export const Game = () => {
    const socket = useSocket();

    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (e) => {
            const message = JSON.parse(e.data as string);
            console.log(message);
            switch (message.type) {
                case INIT_GAME:
                    alert('You are ' + message.payload.color);
                    break;

                case MOVE: {
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    break;
                }

                case GAME_OVER:
                    alert('You are ' + message.payload.color);
                    break;

                default:
                    break;
            }
        };

    }, [socket])

    if (!socket) return <div>Connecting...</div>

    return (<>
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-4 bg-red-200">
                        <ChessBoard board={board}></ChessBoard>
                    </div>
                    <div className="col-span-2 bg-green-200 justify-center">
                        <Button onClick={() => {
                            socket?.send(JSON.stringify({
                                type: INIT_GAME
                            }))
                        }} >
                            Play
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}