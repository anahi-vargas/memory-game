function Overlay(props) {
    const overlays = [
        {divText: "Click to Start", spanText: ""},
        {divText: "Game Over", spanText: "Click to Restart"},
        {divText: "Victory", spanText: "Click to Restart"},
    ]
    return (
        <div className={"overlay-text"} onClick={props.onClick}> {overlays[props.id].divText}
            <span className="overlay-text--small">{overlays[props.id].spanText}</span>
        </div>
    )
}

export default Overlay