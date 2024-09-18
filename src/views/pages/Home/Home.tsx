import { Link } from 'react-router-dom';
import Card from '../../../components/Card/Card';
import { FlashcardSet } from '../../../types';
import { Pencil, Trash } from "@phosphor-icons/react";

const Home = () => {
  const flashcardSets = localStorage.getItem("flashcardSets");
  const data: FlashcardSet[] = flashcardSets ? JSON.parse(flashcardSets) : [];
  const defaultFlashcardSets: FlashcardSet[] = data;

  const resetFlashcardSets = () => {
    localStorage.setItem("flashcardSets", JSON.stringify(defaultFlashcardSets));
  }

  return (
    <>
      <div className="flex justify-center items-center gap-4">
        {data.map((data, index: number) => (
          <div className="flex">
            <Link to={`cardset?category=${encodeURIComponent(data.category)}`} key={index} className="cursor-pointer">
              <Card category={data.category} description={data.description} />
            </Link>
            <div>
              <Link to={`edit?category=${encodeURIComponent(data.category)}`} key={index} className="cursor-pointer">
                <div className="border border-gray-500 text-gray-500 py-1 px-2"><Pencil /></div>
              </Link>
              <button className="border border-red-500 text-red-500 py-1 px-2"><Trash /></button>
            </div>
          </div>
        ))}
      </div>
      <button className="border border-red-500 text-red-500 py-1 px-2" onClick={resetFlashcardSets}>RESET</button>
    </>
  )
}

export default Home