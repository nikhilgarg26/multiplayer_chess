import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export const Landing = () => {
    const navigate = useNavigate();
    const audio = new Audio('/sounds/click.wav'); 
    return (<>
        <div className="flex justify-center">
            <div className="pt-8 max-w-screen-lg mt-10">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex justify-center">
                        <img src="/chessboard.png" className="md:max-w-96 max-w-80"></img>
                    </div>
                    <div className="pt-16">
                        <div className="flex justify-center">
                            <h1 className="text-4xl font-bold text-white">
                                Play Chess Online on the #1 Site!
                            </h1>
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Button onClick={() => {
                                audio.play()
                                navigate("/game")
                            }} >
                                Play Online
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}