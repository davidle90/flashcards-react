import Card from '../../../components/Card/Card';
import data from '../../../data/flashcards.json';

const Home = () => {
  return (
    <>
      <div className="flex justify-center items-center gap-4">
        {data.map((data, index) => (
          <div className="cursor-pointer">
            <Card key={index} category={data.category} description={data.description} />
          </div>
        ))}
      </div>
    </>
  )
}

export default Home