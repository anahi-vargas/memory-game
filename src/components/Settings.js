import { useState } from 'react';

function Settings (props) {
    const [newDifficulty, setNewDifficulty] = useState(props.difficulty);

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
        <button className="settings-button" onClick={() => props.applyChanges(newDifficulty)}>Apply Changes</button>
        <button className="settings-button" onClick={props.setSettings}>Close</button> 
    </div>
    )
}

export default Settings