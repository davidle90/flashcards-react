interface CardProps {
  category: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ category, description }) => {
  return (
    <div>
      <h1 className="font-bold">{category}</h1>
      <p>{description}</p>
    </div>  
  )
}

export default Card