import {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";

const CardDraw = () => {
    const [cardsRemaining, setCardsRemaining] = useState(52)
    const [deck, setDeck] = useState();
    const [cards, setCards] = useState([]);


    useEffect(() => {
        async function getDeckID() {
            const res = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            setDeck(res.data.deck_id)
        }
        getDeckID();
    }, [])

    async function getCard() {
        if (cardsRemaining > 0) {
            const res = await axios.get(`http://deckofcardsapi.com/api/deck/${deck}/draw/`);
            setCards([...cards, res.data.cards[0]])
            setCardsRemaining(res.data.remaining)
        } else {
            alert("Error: No Cards Remaining!")
        }
    }

    return (
        <div>
            <h3>Draw a Card</h3>
            {deck ? <button onClick={getCard}>Get Card</button> : <p>Loading...</p> }
            <div>
                {cards.map(({image, code}) => <Card key={code} code={code} image={image}/>)}
            </div>
        </div>
    )
}

export default CardDraw;
