import { Link } from 'react-router-dom';
import Card from '../../../components/Card/Card';
import { FlashcardSet } from '../../../types';
import { Pencil, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from 'react';
import data from '../../../data/flashcards.json';

const Home = () => {
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);

  useEffect(() => {
    try {
      const storedFlashcardSets = localStorage.getItem("flashcardSets");
      const parsedSets: FlashcardSet[] = storedFlashcardSets ? JSON.parse(storedFlashcardSets) : [];
      setFlashcardSets(parsedSets);
    } catch (error) {
      console.log("Failed to parse flashcard sets from localStorage", error);
      
    }
  }, []);

  const resetFlashcardSets = () => {
    const defaultCardset = data;    
    localStorage.setItem("flashcardSets", JSON.stringify(defaultCardset));
    setFlashcardSets(defaultCardset);
  }

  const deleteFlashcardSet = (id: number | undefined) => {
    const updatedSets = flashcardSets.filter(set => set.id !== id);
    localStorage.setItem("flashcardSets", JSON.stringify(updatedSets));
    setFlashcardSets(updatedSets);
  }

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        {flashcardSets.map((data, index: number) => (
          <div className="flex" key={index}>
            <Link to={`cardset?category=${encodeURIComponent(data.category)}`} className="cursor-pointer">
              <Card category={data.category} description={data.description} />
            </Link>
            <div>
              <Link to={`edit?category=${encodeURIComponent(data.category)}`} className="cursor-pointer">
                <div className="border border-gray-500 text-gray-500 py-1 px-2"><Pencil /></div>
              </Link>
              {data.id !== undefined && (
                <button onClick={() => deleteFlashcardSet(data.id)} className="border border-red-500 text-red-500 py-1 px-2"><Trash /></button>
              )}
            </div>
          </div>
        ))}
        <Link to={`edit`} className="cursor-pointer">
          <div className="border p-4">
              <h1 className="text-3xl">Add</h1>
          </div>
        </Link>
      </div>
      <button className="border border-red-500 text-red-500 py-1 px-2" onClick={resetFlashcardSets}>RESET</button>
    </>
  )
}

export default Home