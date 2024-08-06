// import { Square } from "chess.js";

type Color = 'white' | 'black';

export const Moves = ({ color, black, white }: { color: Color | null, black:string[]|null, white:string[]|null }) => {
    return (<div className="text-center mt-5 absolute top-0">
        <div className="text-white mb-2 text-xl font-bold">Game Started you are {color}</div>
        <div>
            <div className="text-white text-base font-semibold text-center mb-5">Positions Moved</div>
            <div className="flex justify-around">
                <div>
                    <div className="h-1 bg-white w-16 mb-2"></div>
                    {white?.map((move:string, i)=>{
                        return <div key={i} className=" text-white">{move}</div>
                    })}
                </div>
                <div>
                    <div className="h-1 bg-zinc-600 w-16 mb-2"></div>
                    {black?.map((move:string, j)=>{
                        return <div key={j} className="text-white">{move}</div>
                    })}
                </div>
            </div>
        </div>
    </div>)
} 