import { Route, Routes } from 'react-router-dom'
import MasterLayout from './views/layouts/MasterLayout'
import Home from './views/pages/Home/Home'
import Cardset from './views/pages/Cardset/Cardset'
import data from './data/flashcards.json'
import { useEffect } from 'react'
import { FlashcardSet } from './types'
import Edit from './views/pages/Edit/Edit'

function App() {
  const basepath = "/flashcards-react/";

  useEffect(() => {
    const storedFlashcardSets = localStorage.getItem("flashcardSets");

    if(!storedFlashcardSets) {
      const defaultFlashcardSets: FlashcardSet[] = data;
      localStorage.setItem("flashcardSets", JSON.stringify(defaultFlashcardSets));
    }
  }, []);

  // TODO: styling, crud cardsets (localstorage) + sets and cards limit, import/export cardsets
  // correct = green, skip = orange or yellow, reset = purple?, card colors customizable

  return (
    <Routes>
      <Route path={basepath} element={<MasterLayout />}>
        <Route index element={<Home />} />
        <Route path={basepath + "cardset"} element={<Cardset />}/>
        <Route path={basepath + "edit"} element={<Edit />} />
      </Route>
    </Routes>
  )
}

export default App
