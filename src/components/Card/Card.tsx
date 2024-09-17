const Card = ({ category, description }) => {
  return (
    <>
        <div className="border p-4">
            <h1 className="font-bold">{category}</h1>
            <p>{description}</p>
        </div>
    </>
  )
}

export default Card