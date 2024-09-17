import { Link } from "react-router-dom"

const SiteHeader = () => {
  return (
    <div className="py-4 text-center bg-gray-700 text-white">
      <ul>
        <li>
          <Link to="/flashcards-react">Home</Link>
        </li>
      </ul>
    </div>
  )
}

export default SiteHeader