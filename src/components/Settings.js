import { useState } from 'react';

function Settings (props) {
    const [newDifficulty, setNewDifficulty] = useState(props.difficulty);
    // const [selected, setSelected] = useState(0)
    return(
        <div className="settings-container">
            {
                ['Easy', 'Medium', 'Hard'].map((name, i) => 
                    <div
                        key={i}
                        className={`difficulty ${newDifficulty === i ? "selected" : ""}`}
                        onClick={() => setNewDifficulty(i)}>
                            {name}
                    </div>
                )
            }
        {/* // <div className={`difficulty ${props.difficulty === 0 ? "selected" : ""}`} onClick={() => props.setDifficulty(0)}>Easy</div>
        // <div className={`difficulty ${props.difficulty === 1 ? "selected" : ""}`} onClick={() => props.setDifficulty(1)}>Medium</div>
        // <div className={`difficulty ${props.difficulty === 2 ? "selected" : ""}`} onClick={() => props.setDifficulty(2)}>Hard</div> */}
        <button className="settings-button" onClick={() => props.applyChanges(newDifficulty)}>Apply Changes</button>
        <button className="settings-button" onClick={props.setSettings}>Close</button> 
    </div>
    )
}

export default Settings