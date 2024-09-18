import { Link } from "react-router-dom"
import { House } from "@phosphor-icons/react"

const SiteHeader = () => {
  
  return (
    <div className="py-4 flex justify-center items-center bg-gray-700 text-white">
      <ul className="flex gap-4 items-center">
        <li>
          <Link to="/flashcards-react"><House size={32} /></Link>
        </li>
      </ul>
    </div>
  )
}

export default SiteHeader