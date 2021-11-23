import {useState, useEffect, useMemo} from "react" // 
import {images, sounds} from "../assets"
import {GameInfo, Cards, Overlay, Settings} from "./"


function Game() {
    const [start, setStart] = useState(false)
    const [firstCard, setFirstCard] = useState(null)
    const [secondCard, setSecondCard] = useState(null)
    const [matchedCards, setMatched] = useState([])
    const [difficulty, setDifficulty] = useState(0)
    const [flips, setFlips] = useState(0)
    const [time, setTime] = useState(0);
    const [score, setScore] = useState(0)
    const savedScores = ['MemGame-Easy', 'MemGame-Medium', 'MemGame-Hard']

    const getHighScore = () => localStorage.getItem(savedScores[difficulty])

    const [highScore, setHighScore] = useState(getHighScore)
    const [overlayId, setOverlayId] = useState(0)
    const [settingsOpen, setSettings] = useState(false)
    const [cards, setCards] = useState([])
    // const [applied, applyChanges] = useState(true)
    // const [reset, setReset] = useState(false)

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
        finalScore > 0 ? setScore(finalScore) : setScore(0)

        if (finalScore >= highScore) {
            localStorage.setItem(savedScores[difficulty], finalScore)
            setHighScore(finalScore)
        }
    }

    // reset everything
     const startGame = (currentDifficulty = difficulty) => {
        const settingsArr = [{ cards: 20, time: 75,}, { cards: 30, time: 100,}, { cards: 40, time: 180,}];
        const selectedSettings = settingsArr[currentDifficulty];

        cards.map(card => card.flipped = false)
        setMatched([]);
        setFlips(0);
        setScore(0);
        setStart(true);
        setDifficulty(currentDifficulty); 
        setHighScore(localStorage.getItem(savedScores[currentDifficulty]))
        setCards(shuffle(images.slice(0, selectedSettings.cards)));
        setTime(selectedSettings.time);
    }

    useEffect( () => {
        const timer = () => setTime(time - 1);
        if (!start || settingsOpen) { return }

        if (time <= 0) {
            setOverlayId(1)
            return;
        }

        const id = setInterval(timer, 1000);
        return () => clearInterval(id);
        }, [time, start, settingsOpen] // if value changes rerender
    );

    const checkMatch = () => {
        // if the ids dont match flip cards over
        if (cards[firstCard].id !== cards[secondCard].id) {
            setTimeout( () => {
                updateCards(firstCard)
                updateCards(secondCard)
            }, 700)  
        }
        else {
            sounds[3].play()
            matchedCards.push(cards[firstCard].id)
            setScore(s => s + 50)
            if(matchedCards.length === cards.length/2) {
                setOverlayId(2)
            } 
        }

        // reset the cards
        setTimeout( () => {
            setFirstCard(null)
            setSecondCard(null)
        }, 700)
    }

    useEffect(() => { 
        if(secondCard !== null){
            checkMatch()
        }
    }, [secondCard])


    useMemo(() => {
        if (overlayId !== null && overlayId !== 0) {
            setStart(false)
            sounds[overlayId].play()
            calculateFinalScore()
        }
        return overlayId
    }, [overlayId])

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
                setSettings={() => setSettings(s => !s)}
                difficulty={difficulty}
                applyChanges={(newDifficulty) => { startGame(newDifficulty) }}
            />}
        </div>)
    }

export default Game