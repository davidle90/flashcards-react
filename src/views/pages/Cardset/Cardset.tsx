import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FlashcardSet, Flashcard } from "../../../types";

const generateRandomId = (cards: Flashcard[]) => {
    const randomIndex = Math.floor(Math.random() * cards.length);    
    return cards[randomIndex].id;
  };

const Cardset = () => {
    const [cardset, setCardset] = useState<FlashcardSet | null>(null);
    const [cardCount, setCardCount] = useState(0);
    const [currentId, setCurrentId] = useState<number>(0);
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
            if(selectedCardset.flashcards.length <= 0){
                setCardset(null);
            } else {
                const randomId = generateRandomId(selectedCardset.flashcards);
                if(randomId){
                    setCurrentId(randomId);
                }
            }
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

            const availableCards = cardset.flashcards.filter((card) => card.id ? !learnedCards.includes(card.id) : console.log("card id missing")
            );

            let newId;

            do {
                newId = generateRandomId(availableCards);
            } while (newId === currentId)

            if(newId){
                setCurrentId(newId);
            }

        } else if (input === "learned") {
            setCardCount((prevCardCount) => {
                const newCardCount = prevCardCount - 1;
                return newCardCount;
            });

            setLearnedCards((prevLearnedCards) => {
                const newLearnedCards = [...prevLearnedCards, currentId];
                const availableCards = cardset.flashcards.filter(card => card.id ? !newLearnedCards.includes(card.id) : console.log("card id missing")
                );
                if(availableCards.length <= 0){
                    return newLearnedCards;
                }

                const newId = generateRandomId(availableCards);

                if(newId){
                    setCurrentId(newId);
                }

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
        if(randomId){
            setCurrentId(randomId);
        }
    }

    if(!cardset){
        return <div>No flashcards found.</div>;
    }

    const currentFlashcard = cardset.flashcards.find(card => card.id === currentId);

    return (
        <div className="text-center flex flex-col gap-4">
            <div className="text-3xl font-semibold">{cardset.category}</div>
            <p>{cardset.description}</p>
            <div className="text-sm">{cardCount}/{cardset.flashcards.length} cards remaining</div>

            <div className="flex justify-center items-center mx-2 md:mx-0">
                { cardCount <= 0 ? (
                    <div className="border p-5 w-96 h-80 flex flex-col justify-center items-center rounded shadow-md">
                        <span>Congratulations!</span>
                        <p>You have completed this card set!</p>
                    </div>
                ) : (
                    <div className="border p-5 w-96 h-80 flex flex-col justify-between rounded shadow-md">
                        <h1>#{currentFlashcard?.id} Question:</h1>
                        <div className="text-center">{currentFlashcard?.question}</div>

                        {showAnswer ? (
                            <div className="text-center py-1 px-2">
                                {currentFlashcard?.answer}
                            </div>
                        ) : (
                            <button className="border border-yellow-500 text-yellow-500 py-1 px-2 rounded shadow-md hover:bg-yellow-50" onClick={handleShowAnswer}>Show answer</button>
                        )}

                        <div className="flex justify-between items-center">
                            {cardCount > 1 ? (
                                <button className="border border-orange-500 text-orange-500 py-1 px-2 rounded shadow-md hover:bg-orange-50" onClick={() => handleNext("skip")}>Skip</button>
                            ) : (
                                <button className="border border-gray-500 text-gray-500 py-1 px-2 rounded shadow-md" disabled>Skip</button>
                            )}
                            <button className="border border-green-500 text-green-500 py-1 px-2 rounded shadow-md hover:bg-green-50" onClick={() => handleNext("learned")}>Got it!</button>
                        </div>
                    </div>
                )}
            </div>

            <div>
                <button className="border border-purple-500 text-purple-500 py-1 px-2 rounded shadow-md hover:bg-purple-50" onClick={handleResetFlashcards}>Reset flashcards</button>
            </div>
        </div>
    )
}

export default Cardset