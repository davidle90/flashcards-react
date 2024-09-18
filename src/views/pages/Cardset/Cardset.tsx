import { useLocation } from "react-router-dom";
import data from "../../../data/flashcards.json";
import { useState } from "react";

const Cardset = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    const cardset = data.find(d => d.category === category);

    if(!cardset){
        return <div>No flashcards found.</div>;
    }

    const generateRandomIndex = (count: number) => Math.floor(Math.random() * count);

    const flashcardCount = cardset.flashcards.length;
    const [cardCount, setCardCount] = useState(flashcardCount);
    const [currentIndex, setCurrentIndex] = useState(generateRandomIndex(flashcardCount));
    const [showAnswer, setShowAnswer] = useState(false);
    const [flashcardsComplete, setFlashcardsComplete] = useState(false);


    const handleNext = (input: string) => {
        setShowAnswer(false);

        if (input === "skip") {
            if(cardCount <= 1) {
                console.log("Not enough cards to shuffle");
                return;
            }

            let newIndex;

            do {
                newIndex = generateRandomIndex(cardCount);
            } while (newIndex === currentIndex);

            setCurrentIndex(newIndex);

        } else if (input === "correct") {
            setCardCount((prevCardCount) => {
                const newCardCount = prevCardCount - 1;
                if (newCardCount <= 0) {
                    setFlashcardsComplete(true);
                } else {
                    setCurrentIndex(generateRandomIndex(newCardCount));
                }
                return newCardCount;
            });
        }
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
    }

    const handleResetFlashcards = () => {
        setCardCount(flashcardCount);
        setCurrentIndex(generateRandomIndex(flashcardCount));
        setShowAnswer(false);
        setFlashcardsComplete(false);
    }

    return (
        <>
            <div>{cardset.category}</div>
            <p>{cardset.description}</p>

            <div>{cardCount}/{cardset.flashcards.length}</div>
            <div>{currentIndex}</div>

            { flashcardsComplete ? (
                <div>Congratulations! You have completed this card set!</div>
            ) : (
                <div>
                    <div className="border">
                        <h1>Question:</h1>
                        <p>{cardset.flashcards[currentIndex].question}</p>

                        {showAnswer ? (
                            <>
                                <h1>Answer:</h1>
                                <p>{cardset.flashcards[currentIndex].answer}</p>
                            </>
                        ) : (
                            <button onClick={handleShowAnswer}>Show answer</button>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        {cardCount > 1 ? (
                            <button onClick={() => handleNext("skip")}>Skip</button>
                        ) : (
                            <button disabled>Skip</button>
                        )}
                        <button onClick={() => handleNext("correct")}>Got it!</button>
                    </div>
                </div>
            )}            

            <button onClick={handleResetFlashcards}>Reset flashcards</button>
        </>
    )
}

export default Cardset