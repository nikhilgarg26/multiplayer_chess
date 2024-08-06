import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { ChessBoard } from "../components/Chessboard"
import { useSocket } from "../hooks/useSocket"
import { Chess } from 'chess.js'
import CustomizedDialogs from "../components/Dialog"
import { Moves } from "../components/Moves"

export const INIT_GAME = "init_game"
export const MOVE = "move"
export const GAME_OVER = "game_over"

export const Game = () => {
    const socket = useSocket();
    type Color = 'white' | 'black';
    const audio = new Audio('/sounds/click.wav');

    const [game, setGame] = useState(false);
    const [connect, setConnecting] = useState(false);
    const [color, setColor] = useState<Color | null>(null);
    const [chess] = useState(new Chess());
    const [board, setBoard] = useState(chess.board());
    const [over, setOver] = useState(false);
    const [winner, setWinner] = useState<Color | null>(null);
    const [black, setBlack] = useState<string[] | null>(null);
    const [white, setWhite] = useState<string[] | null>(null);

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (e) => {
            const message = JSON.parse(e.data as string);
            switch (message.type) {
                case INIT_GAME:
                    setConnecting(false);
                    setGame(true);
                    setColor(message.payload.color)
                    break;
                case MOVE: {
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board());
                    if (color === 'black') {
                        setWhite((prevMoves) => [...(prevMoves || []), move.to]);
                    } else {
                        setBlack((prevMoves) => [...(prevMoves || []), move.to]);
                    }

                    break;
                }
                case GAME_OVER:
                    setWinner(message.payload.winner)
                    setOver(true);
                    if (color == winner) {
                        new Audio('/sounds/winning.wav').play();
                    } else {
                        new Audio('/sounds/lossing.mp3').play();
                    }
                    break;

                default:
                    break;
            }
        };

    }, [socket, color])

    if (!socket) return <div className="bg-green-100 flex justify-center">Connecting to server...</div>

    return (<>
        <div className="flex justify-center ">
            <div className="pt-8 max-w-screen-lg w-full mt-10">
                <div className="grid grid-cols-6 gap-4">
                    <div className="col-span-4 flex justify-center">
                        <ChessBoard chess={chess} setBoard={setBoard} board={board} socket={socket} color={color} setBlack={setBlack} setWhite={setWhite}></ChessBoard>
                    </div>
                    <div className="col-span-2 flex justify-center items-center relative bg-slate-800">
                        {connect ?
                            <div className="text-white">Searching Opponent ...</div> : (game ? <Moves color={color} black={black} white={white}></Moves> : <Button onClick={() => {
                                socket?.send(JSON.stringify({
                                    type: INIT_GAME
                                }));
                                setConnecting(true);
                                audio.play();
                            }} >
                                Play
                            </Button>)}
                    </div>
                    {over && <CustomizedDialogs winner={winner}></CustomizedDialogs>}
                </div>
            </div>
        </div>
    </>)
}