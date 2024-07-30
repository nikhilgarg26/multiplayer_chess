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
    type Color = 'white' | 'black';

    const [game, setGame] = useState(false);
    const [connect, setConnecting] = useState(false);
    const [color, setColor] = useState<Color | null>(null);
    const [chess, setChess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (e) => {
            const message = JSON.parse(e.data as string);
            // console.log(message);
            switch (message.type) {
                case INIT_GAME:
                    setConnecting(false);
                    setGame(true);
                    setColor(message.payload.color)
                    break;

                case MOVE: {
                    const move = message.payload;
                    console.log(move);
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

    if (!socket) return <div className="bg-green-100 flex justify-center">Connecting to server...</div>

    return (<>
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg w-full">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-4 flex justify-center">
                        <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} color={color}></ChessBoard>
                    </div>
                    <div className="col-span-2 flex justify-center items-center">
                        {connect ?
                             <div className="text-white">Searching Opponent ...</div>: (game? <div className="text-white">Game Started you are {color}</div>:<Button onClick={() => {
                                socket?.send(JSON.stringify({
                                    type: INIT_GAME
                                }));
                                setConnecting(true);
                            }} >
                                Play
                            </Button> )}
                    </div>
                </div>
            </div>
        </div>
    </>)
}