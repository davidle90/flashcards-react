import { Route, Routes } from 'react-router-dom'
import MasterLayout from './views/layouts/MasterLayout'
import Home from './views/pages/Home/Home'

function App() {

  const basepath = "/flashcards-react/";

  return (
    <Routes>
      <Route path={basepath} element={<MasterLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
