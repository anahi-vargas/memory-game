const imageFileNames = ["tina", "louise", "gene", "linda", "bob", "chariot", "keyboard", "kopi", "wine", "burger2", 
"jimmy", "jimmyjr", "andy", "ollie", "hat", "gretchen", "dryer", "teddy", "hammer", "mort", "wig"]

const soundFileNames =  ["flip", "gameOver", "victory", "match"]

export const images = imageFileNames.flatMap((image, index) => ([
    { id: index, name: image, visibility: "", flipped: false },
    { id: index, name: image, visibility: "", flipped: false }
]))

export const sounds = soundFileNames.map(sound => new Audio(require(`./assets/audio/${sound}.wav`).default))