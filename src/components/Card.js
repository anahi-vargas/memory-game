function Card(props) {
    return (
        <div className={`card ${props.visible ? "visible" : ""}`} key={props.index} onClick={() => props.flipCard(props.index)}>             
            <div className="card-front card-face">
                <img src={require(`../assets/img/${props.name}.png`).default} alt={`${props.name} front`} className="card-value"/>
            </div>
            <div className="card-back card-face">
                <img src={require("../assets/img/burger.png").default} alt={"burger on card back"} className="burger"  /> 
            </div> 
        </div>
    )
}

export default Card