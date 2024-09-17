import { useLocation } from "react-router-dom";
import data from "../../../data/flashcards.json";
import { useState } from "react";

const Cardset = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const cardset = data.find(d => d.category === category);

    if(!cardset){
        return (
            <div>
                No flashcards found.
            </div>
        )
    }

    const flashcardCount = cardset.flashcards.length;

    const [cardCount, setCardCount] = useState(flashcardCount);
    const randomIndex = Math.floor(Math.random() * cardCount);
    const [currentIndex, setCurrentIndex] = useState(randomIndex);

    const handleNext = (input) => {

        if(input === "skip") {
            let newIndex;

            if(cardCount < 0) {
                console.log("Not enough cards to shuffle");
            } else {
                do {
                    newIndex = Math.floor(Math.random() * cardCount);
                } while (newIndex === currentIndex);

                setCurrentIndex(newIndex);
            }

        }else if(input === "correct") {
            setCardCount(cardCount - 1);
            const randomIndex = Math.floor(Math.random() * cardCount);

            if(cardCount < 0){
                console.log("You got it all :)");
            } else {
                setCurrentIndex(randomIndex);
            }

            // Restart button, Complete Screen

        }
    };

    return (
        <>
            <div>{cardset.category}</div>
            <p>{cardset.description}</p>

            <div>{cardCount}/{cardset.flashcards.length}</div>
            <div>{currentIndex}</div>

            <div className="border">
                <h1>Question:</h1>
                <p>{cardset.flashcards[currentIndex].question}</p>

                <h1>Answer:</h1>
                <p>{cardset.flashcards[currentIndex].answer}</p>
            </div>

            <div className="flex justify-between items-center">
                <button onClick={() => handleNext("skip")}>Skip</button>
                <button onClick={() => handleNext("correct")}>Got it!</button>
            </div>
        </>
    )
}

export default Cardset