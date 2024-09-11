

import { useDispatch,useSelector } from 'react-redux'
import { setitem } from '../redux/itemSlice'
import { useNavigate } from 'react-router-dom'
import  {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleUser, faTrash} from "@fortawesome/free-solid-svg-icons"


function CardItem(props) {
  const cart  = useSelector((state)=>{return state.userCart})
  const Dispatch = useDispatch()
  const navigate = useNavigate(null)

  const handleClick = (note)=>{
    if(props.shopItem){
      return
    }
     Dispatch(setitem(note))
     navigate("/itempage")
  }

  
  
  const handeDeleteShopItem = async  ()=>{
  const res = await fetch("http://localhost:5000/items/deleteItems", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({
      item_id : props.note._id
    })
})

const response = await res.json()
props.getItems()
  }
 
  return (
    <div className="col my-3" onClick={()=>{handleClick(props.note)}} style={{cursor:"pointer"}}>
      <div className="card " style={{maxWidth: "15rem"}}>
  <img src= {props.note.src} style={{height:"15rem"}} className="card-img-top" alt="..."/>
  <div className="card-body ">
    <h5 className="card-title">clothingType: {props.note.clothingType}</h5>
    <p className="card-text">price: {props.note.price}</p>
    <p className="card-text d-flex "> <span className=" ms-auto badge text-bg-warning w-25">{props.note.overallRating}</span></p>
  
  
    <div className="dropdown">
    { props.shopItem==true&&<div><FontAwesomeIcon icon={faTrash} style={{cursor:"pointer"}} onClick={handeDeleteShopItem}/></div>}
 
</div>
  </div>
</div>
    </div>
  )
}


export default CardItem
