import { Route, Routes } from 'react-router-dom'
import MasterLayout from './views/layouts/MasterLayout'
import Home from './views/pages/Home/Home'
import Cardset from './views/pages/Cardset/Cardset';

function App() {

  const basepath = "/flashcards-react/";

  return (
    <Routes>
      <Route path={basepath} element={<MasterLayout />}>
        <Route index element={<Home />} />
        <Route path={basepath + "cardset"} element={<Cardset cardset={{}} />}/>
      </Route>
    </Routes>
  )
}

export default App
