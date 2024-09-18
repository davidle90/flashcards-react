import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FlashcardSet } from "../../../types";

const emptyFlashcardSet: FlashcardSet = {
  category: 'New card set',
  description: 'no description',
  flashcards: []
};

const Edit = () => {
  const [editCardset, setEditCardset] = useState<FlashcardSet>(emptyFlashcardSet);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  useEffect(() => {
    const flashcardSets = localStorage.getItem("flashcardSets");
    const data: FlashcardSet[] = flashcardSets ? JSON.parse(flashcardSets) : [];
  
    const cardset: FlashcardSet | undefined = category ? data.find(d => d.category === category) : undefined;
    if (cardset) {
      setEditCardset(cardset);
    }
  }, [category]);

  const handleSaveData = () => {
    // todo
  }

  return (
    <div>
      <div>{editCardset.category}</div>
      <div>{editCardset.description}</div>
      <ul className="flex gap-4">
        {editCardset.flashcards.map((flashcard, index) => (
          <li key={index} className="border">
            <p>#{index + 1}</p>
            <p>Question: {flashcard.question}</p>
            <p>Answer: {flashcard.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Edit