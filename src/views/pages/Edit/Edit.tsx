import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Flashcard, FlashcardSet } from "../../../types";

const emptyFlashcardSet: FlashcardSet = {
  id: undefined,
  category: 'New card set',
  description: 'no description',
  flashcards: []
};

const Edit = () => {
  const [formData, setFormData] = useState<FlashcardSet>(emptyFlashcardSet);
  const [submitted, setSubmitted] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get('category');

  useEffect(() => {
    const flashcardSets = localStorage.getItem("flashcardSets");
    const data: FlashcardSet[] = flashcardSets ? JSON.parse(flashcardSets) : [];
  
    const cardset: FlashcardSet | undefined = category ? data.find(d => d.category === category) : emptyFlashcardSet;
    
    if (cardset) {
      if(cardset.id == undefined){
        cardset.id = data.length + 1;
      }
      setFormData(cardset);
    }
  }, [category]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;

    if(index !== undefined) {
      const updatedFlashcards = [...formData.flashcards];
      updatedFlashcards[index] = {
        ...updatedFlashcards[index],
        [name]: value
      };

      setFormData(prevData => ({
        ...prevData,
        flashcards: updatedFlashcards
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }))
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedCardsets = localStorage.getItem("flashcardSets");
    const data: FlashcardSet[] = storedCardsets ? JSON.parse(storedCardsets) : [];

    const cardsetExists = data.findIndex(d => d.id === formData.id);

    if(cardsetExists !== -1){
      data[cardsetExists] = formData;
    } else {
      data.push(formData);
    }
    
    localStorage.setItem("flashcardSets", JSON.stringify(data));
    setSubmitted(true);
  }

  const handleAddFlashcard = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newCardId = formData.flashcards.length + 1;
    const newFlashcard: Flashcard = { id: newCardId ,question: '', answer: '' };
    setFormData(prevData => ({
      ...prevData,
      flashcards: [...prevData.flashcards, newFlashcard]
    }));
  }

  const handleRemoveFlashcard = (e: React.FormEvent<HTMLButtonElement>, id: number | undefined) => {
    e.preventDefault();
    const updatedFlashcards = formData.flashcards.filter((_, i) => i !== id);
    setFormData(prevData => ({
      ...prevData,
      flashcards: updatedFlashcards
    }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="md:flex gap-4">
        <div className="flex justify-center mb-5">
          <div>
            <div className="mb-3">
              <label className="block">Category: </label>
              <input  
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2.5"
              />
            </div>
            <div>
              <label className="block">Description: </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2.5"
              />
            </div>
            
            <div className="flex gap-2 mt-3">
              <button onClick={handleAddFlashcard} className="border border-yellow-500 text-yellow-500 py-1 px-2 rounded shadow-md hover:bg-yellow-50">Add flashcard</button>
              <button type="submit" className="border border-green-500 text-green-500 py-1 px-2 rounded shadow-md hover:bg-green-50">Submit</button>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-3 text-center md:text-start">Flash cards: </label>
          <div className="md:grid grid-cols-5 gap-4">
            {formData.flashcards.map((flashcard, index) => (
              <div key={index} className="border p-5 rounded m-3 md:m-0">
                <div>
                  <label className="block">Question: </label>
                  <input
                    type="text"
                    name="question"
                    value={flashcard.question}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2.5"
                  />
                </div>
                <div className="mb-3">
                  <label className="block">Answer: </label>
                  <input
                    type="text"
                    name="answer"
                    value={flashcard.answer}
                    onChange={(e) => handleChange(e, index)}
                    required
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md p-2.5"
                  />
                </div>

                <button onClick={(e) => handleRemoveFlashcard(e, flashcard.id)} className="border border-red-500 text-red-500 py-1 px-2 rounded shadow-md hover:bg-red-50">Remove card</button>
              </div>
            ))}
          </div>
        </div>
      </form>

      { submitted ? (
        <div>
          <span className="text-green-600">Card set has been saved!</span>
        </div>
      ) : (
        <>
        </>
      )}
    </div>
  )
}

export default Edit