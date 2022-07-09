import {useState, useEffect, useRef} from "react";
import axios from "axios";
import Card from "./Card";

const CardDraw2 = () => {
    const [drawing, setDrawing] = useState(false);
    const [deck, setDeck] = useState();
    const [cards, setCards] = useState([]);
    const intervalId = useRef(null);


    useEffect(() => {
        async function getDeckID() {
            const res = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            setDeck(res.data.deck_id)
        }
        getDeckID();
    }, [])

    useEffect(() => {
        async function getCard() {
            try {
                let res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/`);
                setCards(c => [...c, res.data.cards[0]])
                if (res.data.remaining === 0) {
                    setDrawing(false);
                    throw new Error("no cards remaining")
                }
            } catch (err) {
                console.log(err)
            }
        }

        if (drawing && !intervalId.current) {
            intervalId.current = setInterval(async () => {
                await getCard();
            }, 500);
        }

        return () => {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }

    }, [drawing])

    const toggleDraw = () => {
        setDrawing(drawing => !drawing);
    };

    const fullDeck = () => {
        if (cards.length === 52) {
            return "No More Cards"
        } 
    }


    return (
        <div>
            <h3>Draw a Card For Me</h3>
            {deck ? (
            <button onClick={toggleDraw}>
                {drawing ? "Stop Drawing" : "Start Drawing"}
            </button>) 
            : <p>Loading...</p> }
            <h3>{fullDeck()}</h3>
            <div>
                {cards.map(({image, code}) => <Card key={code} code={code} image={image}/>)}
            </div>
        </div>
    )
}

export default CardDraw2;
