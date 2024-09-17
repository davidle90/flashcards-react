import { Link } from 'react-router-dom';
import Card from '../../../components/Card/Card';
import data from '../../../data/flashcards.json';

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center gap-4">
        {data.map((data, index) => (
          <Link to={`cardset?category=${encodeURIComponent(data.category)}`} key={index} className="cursor-pointer">
            <Card category={data.category} description={data.description} />
          </Link>
        ))}
      </div>
    </>
  )
}

export default Home