import React from 'react'
import { useNavigate } from 'react-router-dom'

const Catview = () => {
  const navigate = useNavigate()


  const handleClick = (id) => {

    console.log(id)
    navigate(`/view/${id}`)

  }
  return (
    <div>
      <div className='item'>
      <div className="item-listing-details">
        <img src={image1} alt="" />
        <h3>{subcategory}</h3>
        <p className='t'>{props.category}</p>

        <div className="item-price-new">
          &#8377;{props.price}
        </div>
        <Button onClick={() => handleClick(props.id)} variant="contained" >View</Button>

      </div>
    </div>
    </div>
  )
}

export default Catview
