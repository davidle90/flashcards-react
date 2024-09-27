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
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {flashcardSets.map((data, index: number) => (
            <div key={index} className="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden border transition-transform transform hover:scale-105">
              <Link
                to={`cardset?category=${encodeURIComponent(data.category)}`}
                className="cursor-pointer"
              >
                <div className="w-64 h-40 flex flex-col justify-between p-4">
                  <Card category={data.category} description={data.description} />
                </div>
              </Link>
              <div className="flex justify-between p-4 border-t bg-gray-50">
                <Link
                  to={`edit?category=${encodeURIComponent(data.category)}`}
                  className="cursor-pointer"
                >
                  <div className="flex items-center justify-center border border-gray-500 text-gray-500 rounded py-1 px-2 hover:bg-gray-100">
                    <Pencil />
                  </div>
                </Link>
                {data.id !== undefined && (
                  <button
                    onClick={() => deleteFlashcardSet(data.id)}
                    className="flex items-center justify-center border border-red-500 text-red-500 rounded py-1 px-2 hover:bg-red-50"
                  >
                    <Trash />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center">
        <Link to={`edit`} className="cursor-pointer">
          <button className="border border-green-500 text-green-500 py-2 px-4 rounded shadow-md hover:bg-green-50 transition-colors">
            Add
          </button>
        </Link>
        <button
          className="border border-red-500 text-red-500 py-2 px-4 rounded shadow-md hover:bg-red-50 transition-colors"
          onClick={resetFlashcardSets}
        >
          RESET
        </button>
      </div>
    </>
  );
  
}

export default Home