import {MdSettings, MdRefresh} from "react-icons/md";

function GameInfo (props){
    return (
        <div className="game-info-container">
            <div className="game-info-row1">
                <div>
                    <div className="game-info">High Score {props.highScore}</div>
                    <div className="game-info">Score {props.score}</div>
                </div>
                <div className="game-info">
                    <MdRefresh  className="icon" onClick={props.restart}/>
                    <MdSettings className="icon" onClick={props.setSettings}/>
                </div>
            </div>
            <div className="game-info-row2 game-title">Mix & Match Burgers</div>
            <div className="game-info-row3">
                <div className="game-info">Time {props.time}</div>
                <div className="game-info">Flips {props.flips}</div>
            </div>
        </div>
    )
}

export default GameInfo