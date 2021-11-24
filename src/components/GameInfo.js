import {MdSettings, MdRefresh, MdVolumeMute, MdVolumeUp} from "react-icons/md";
import {toggleSounds} from "../assets";
import {useState} from "react";

function GameInfo (props){
    const [isMuted, setIsMuted] = useState(false);
    const MdVolume = props => isMuted ? <MdVolumeMute {...props} /> : <MdVolumeUp {...props} />;

    return (
        <div className="game-info-container">
            <div className="game-info-row1">
                <div>
                    <div className="game-info">High Score {props.highScore}</div>
                    <div className="game-info">Score {props.score}</div>
                </div>
                <div className="game-info">
                    <MdRefresh  onClick={props.restart}/>
                    <MdSettings onClick={props.setSettings}/>
                    <MdVolume onClick={() => { toggleSounds(); setIsMuted(!isMuted); }} />
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