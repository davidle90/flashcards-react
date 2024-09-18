import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FlashcardSet, Flashcard } from "../../../types";

// const generateRandomIndex = (count: number) => Math.floor(Math.random() * count);

const generateRandomId = (cards: Flashcard[]) => {
    const randomIndex = Math.floor(Math.random() * cards.length);    
    return cards[randomIndex].id;
  };

const Cardset = () => {
    const [cardset, setCardset] = useState<FlashcardSet | null>(null);
    const [cardCount, setCardCount] = useState(0);
    const [currentId, setCurrentId] = useState<number | null>(null);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const [learnedCards, setLearnedCards] = useState<number[]>([]);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');

    useEffect(() => {
        const flashcardSets = localStorage.getItem("flashcardSets");
        const data: FlashcardSet[] = flashcardSets ? JSON.parse(flashcardSets) : [];
        const selectedCardset = data.find(d => d.category === category);

        if(selectedCardset) {
            setCardset(selectedCardset);
            setCardCount(selectedCardset.flashcards.length);

            const randomId = generateRandomId(selectedCardset.flashcards);
            setCurrentId(randomId);
        } else {
            setCardCount(0);
        }
    }, [category]);

    const handleNext = (input: string) => {
        if (!cardset || currentId === null) return;

        setShowAnswer(false);

        if (input === "skip") {
            if(cardCount <= 1) {
                console.log("Not enough cards to shuffle");
                return;
            }

            const availableCards = cardset.flashcards.filter((card) => !learnedCards.includes(card.id));

            let newId;

            do {
                newId = generateRandomId(availableCards);
            } while (newId === currentId)

            setCurrentId(newId);

        } else if (input === "learned") {
            setCardCount((prevCardCount) => {
                const newCardCount = prevCardCount - 1;
                return newCardCount;
            });

            setLearnedCards((prevLearnedCards) => {
                const newLearnedCards = [...prevLearnedCards, currentId];
                const availableCards = cardset.flashcards.filter(card => !newLearnedCards.includes(card.id));
                if(availableCards.length <= 0){
                    return newLearnedCards;
                }
                const newId = generateRandomId(availableCards);
                setCurrentId(newId);
                return newLearnedCards;
            });
        }        
    };

    const handleShowAnswer = () => {
        setShowAnswer(true);
    }

    const handleResetFlashcards = () => {
        if(!cardset) return;

        setLearnedCards([]);
        setShowAnswer(false);
        setCardCount(cardset.flashcards.length);
        const randomId = generateRandomId(cardset.flashcards);
        setCurrentId(randomId);
    }

    if(!cardset){
        return <div>No flashcards found.</div>;
    }

    const currentFlashcard = cardset.flashcards.find(card => card.id === currentId);

    return (
        <>
            <div className="text-3xl font-semibold">{cardset.category}</div>
            <p className="mb-5">{cardset.description}</p>
            <div>{cardCount}/{cardset.flashcards.length} cards remaining</div>

            { cardCount <= 0 ? (
                <div>Congratulations! You have completed this card set!</div>
            ) : (
                <div>
                    <div className="border">
                        <h1>#{currentFlashcard?.id} Question:</h1>
                        <p>{currentFlashcard?.question}</p>

                        {showAnswer ? (
                            <>
                                <h1>Answer:</h1>
                                <p>{currentFlashcard?.answer}</p>
                            </>
                        ) : (
                            <button className="border border-yellow-500 text-yellow-500 py-1 px-2" onClick={handleShowAnswer}>Show answer</button>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        {cardCount > 1 ? (
                            <button className="border border-orange-500 text-orange-500 py-1 px-2" onClick={() => handleNext("skip")}>Skip</button>
                        ) : (
                            <button className="border border-gray-500 text-gray-500 py-1 px-2" disabled>Skip</button>
                        )}
                        <button className="border border-green-500 text-green-500 py-1 px-2" onClick={() => handleNext("learned")}>Got it!</button>
                    </div>
                </div>
            )}            

            <button className="border border-purple-500 text-purple-500 py-1 px-2" onClick={handleResetFlashcards}>Reset flashcards</button>
        </>
    )
}

export default Cardset