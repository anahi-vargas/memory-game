import Card from "./Card"

function Cards(props) {
    return(
    <div className="cards">
        {props.cards.map((card, index) => { 
            return(<Card key={index} index={index} visible={card.flipped} name={card.name} flipCard={props.flipCard} />) })}
    </div>)
}
export default Cards