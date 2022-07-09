import "./Card.css"

const Card = ({image, code}) => {
    return (
        <img 
            className="Card" 
            src={image} 
            alt={code}            
        >
        </img>
    )
}

export default Card;