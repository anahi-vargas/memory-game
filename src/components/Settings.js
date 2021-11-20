function Settings (props) {
    return(
        <div className="settings-container">
        <div className={`difficulty ${props.difficulty === 0 ? "selected" : ""}`} onClick={() => props.setDifficulty(0)}>Easy</div>
        <div className={`difficulty ${props.difficulty === 1 ? "selected" : ""}`} onClick={() => props.setDifficulty(1)}>Medium</div>
        <div className={`difficulty ${props.difficulty === 2 ? "selected" : ""}`} onClick={() => props.setDifficulty(2)}>Hard</div>
        <button className="settings-button" onClick={props.applyChanges}>Apply Changes</button>
        <button className="settings-button" onClick={props.setSettings}>Close</button> 
    </div>
    )
}

export default Settings