import {useState, useEffect} from "react"
import {images, sounds} from "../assets"
import {GameInfo, Cards, Overlay, Settings} from "./"


function Game() {
    const [start, setStart] = useState(false)
    const [firstCard, setFirstCard] = useState(null)
    const [secondCard, setSecondCard] = useState(null)
    const [cards, setCards] = useState([])
    const [matchedCards, setMatched] = useState([])
    const [settingsOpen, setSettings] = useState(false)
    const [difficulty, setDifficulty] = useState(0)
    const [flips, setFlips] = useState(0)
    const [time, setTime] = useState(0);
    const [score, setScore] = useState(0)
    const [overlayId, setOverlayId] = useState(0)
    const savedScores = ['MemGame-Easy', 'MemGame-Medium', 'MemGame-Hard']
    const [highScore, setHighScore] = useState(localStorage.getItem(savedScores[difficulty]))

    const shuffle = (cards) => {
        let temp;
        for (let i = cards.length - 1; i > 0; i--) {
          let randIndex = Math.floor(Math.random() * (i + 1));
          temp = cards[randIndex];
          cards[randIndex] = cards[i]
          cards[i] = temp;
        }
        return cards
    }

    const flipCard = (index) => {
        if (canFlip(index)) {
            setFlips(prevFlips => prevFlips + 1)
            sounds[0].play()
            if (firstCard === null) {
                setFirstCard(index)
            }
            if (firstCard !== null && secondCard === null) {
                setSecondCard(index) 
                checkMatch(index)
            }
            updateCards(index)
        }
    }

    const canFlip = (index) => {
        return ((firstCard === null || secondCard === null) && 
            !matchedCards.includes(cards[index].id) &&
            firstCard !== index && !settingsOpen) 
    }

    // flip the card at the given given index
    const updateCards = (index) => {
        cards[index].flipped = !cards[index].flipped
    }

    const calculateFinalScore = () => {
        const finalScore = score + time - 5*(flips - matchedCards.length * 2)
        setScore(finalScore > 0 ? finalScore : 0)

        if (finalScore >= highScore) {
            localStorage.setItem(savedScores[difficulty], finalScore)
            setHighScore(finalScore)
        }
    }

    // reset everything
     const startGame = (currentDifficulty = difficulty) => {
        const settingsArr = [{ cards: 20, time: 75,}, { cards: 30, time: 100,}, { cards: 40, time: 180,}];
        const selectedSettings = settingsArr[currentDifficulty];

        // cards.map(card => card.flipped = false)
        setMatched([]);
        setFlips(0);
        setScore(0);
        setStart(true);
        setDifficulty(currentDifficulty); 
        setHighScore(localStorage.getItem(savedScores[currentDifficulty]))
        setCards(shuffle(images.slice(0, selectedSettings.cards)));
        setTime(selectedSettings.time);
    }

    const handleGameReport = (currentOverlayId) => {
        sounds[currentOverlayId].play();
        calculateFinalScore();
        setOverlayId(currentOverlayId);
        setStart(false);
    }

    // this is for the timer thingy
    useEffect( () => {
        const timer = () => setTime(time => time - 1);
        let id = null;

        if (!start || settingsOpen) { 
            clearInterval(id);
        } else {
            id = setInterval(timer, 1000);
        }

        return () => clearInterval(id);
        }, [start, settingsOpen] // if value changes rerender
    );

    const checkMatch = (secondCardIndex) => {
        // if the ids do not match, flip both cards over
        if (cards[firstCard].id !== cards[secondCardIndex].id) {
            setTimeout( () => {
                updateCards(firstCard)
                updateCards(secondCardIndex)
            }, 700)  
        }
        else {
            sounds[3].play()
            matchedCards.push(cards[firstCard].id)
            setScore(prevScore => prevScore + 50)
            if(matchedCards.length === cards.length/2) {
                handleGameReport(2);
            } 
        }

        // reset the cards
        setTimeout( () => {
            setFirstCard(null)
            setSecondCard(null)
        }, 700)
    }

    // out of time!
    if (start && time <= 0) {
        handleGameReport(1);
        return;
    }

    return(
        <div>
            {overlayId !== null 
            && <Overlay
                id={overlayId}
                onClick={() => { setOverlayId(null); startGame()}}/>}
            <GameInfo
                highScore={highScore}
                score={score}
                time={time}
                flips={flips}
                restart={() => {startGame()}}
                setSettings={() => setSettings(!settingsOpen)}/>
            <Cards cards={cards} flipCard={flipCard} />
            {settingsOpen
            && <Settings
                setSettings={() => setSettings(!settingsOpen)}
                difficulty={difficulty}
                applyChanges={(newDifficulty) => { startGame(newDifficulty) }}
            />}
        </div>)
    }

export default Game