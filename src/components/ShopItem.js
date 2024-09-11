import React from 'react'
import { useState, useEffect} from 'react'
import CardItem from './CardItem'
import { useNavigate } from 'react-router-dom'
import { resetKeeper } from '../redux/tokenSlice'
import Modal from './Modal'
import { useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { resetCart } from '../redux/userDataSlice'
import Alerts from './Alerts'
import { useRef } from 'react'

function ShopItem() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const ref = useRef(0)
  const keeperDetails = useSelector((state) => { return state.keeperDetails.details })
  const Token = useSelector((state) => { return state.userToken })
  const [forShopItem,setForShopItem] = useState(false)
  const [showAlert,setShowAlert] = useState({show:false,text:null,colour:null})

const handleLogout = async ()=>{
  const res = await fetch("http://localhost:5000/api/keeperlogout",{
    method: "GET",
    
     credentials: 'include'
    
  })

 
  const response = await res.json()
 
  ref.current.click()
  
  dispatch(resetKeeper())
  navigate("/")
 
  
}

  const [cardDetails, setCardDetails] = useState([])


  const [show, setShow] = useState({ current: false })


  const handleDeleteAccount = async ()=>{
    const res = await fetch("http://localhost:5000/api/skAccount",{
      method:"DELETE",
      credentials:"include"
    })
    const response = await res.json()
  
    ref.current.click()
  dispatch(resetKeeper())
  dispatch(resetCart())
  navigate("/")
  navigate(0)
  }


  const getItems = async () => {

    if (Token.authorised === true) {
      const res = await fetch("http://localhost:5000/items/getItems", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",

        },


      })

      const response = await res.json()
  
      if (res.status === 200) {
        setCardDetails(response.auser)


        setShow({ current: response.status })
      }
    }
    //   console.log(cardDetails)
  }







  useEffect(() => {
    setForShopItem(true)
    getItems()
  }, [])


  return (
    <div>
      <a href='/' ref={ref } className='d-none'></a>
      {showAlert.show&&<Alerts colour={showAlert.colour} setShowAlert={setShowAlert} text={showAlert.text} show = {showAlert.show}></Alerts>}
      <div className='d-flex'>
        <nav className="navbar navbar-expand-lg bg-primary rounded m-2  flex-grow-1">
          <div className="container-fluid">
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 align-items-center d-flex'> <li className="nav-item  text-white" style={{cursor:"pointer "}} ><Link  className="nav-link text-white fw-bold"  to="/includeitems">shopit</Link></li>
          
            <li className="nav-item  text-white" style={{cursor:"pointer "}} ><Link  className="nav-link text-white fw-bold"  to="/adminorder">orders</Link></li></ul>
          
          </div>
        </nav>
        <button className="btn btn-sm btn-primary m-2 " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
          account
        </button>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
          <div className='offcanvas-header bg-light border'><h1 className='offcanvas-title'>shopkeeper account</h1><button className='btn btn-close ' ref={ref} data-bs-dismiss="offcanvas"></button></div>
          <div className='offcanvas-body'><div className='d-flex justify-content-between m-2'><span>name: {keeperDetails.name}</span><span>shopname:  {keeperDetails.shopName}</span></div>
            <div className='m-2'>email:   {keeperDetails.email}</div>
            <div className='m-2'>phone:   {keeperDetails.phone}</div>
            <div className='m-2'>address:   {keeperDetails.officeaddress}</div>
            <button className='btn btn-primary ' onClick={handleLogout}>logout</button>
            <button className='btn btn-danger mx-4' onClick={handleDeleteAccount}>delete account</button>
          </div>
      
        </div>
      </div>
      <div className='container '>

        <h1>shop items:</h1>
        <Modal  getItems={getItems} setShowAlert={setShowAlert} />

        <div className='row align-items-start'>

          {show.current === true && cardDetails.map((note) => {

            return <CardItem key={note._id} note={note} shopItem={forShopItem}   getItems={getItems}></CardItem>
          })

          }
          {show.current === false && <p className='my-2'>No item to show</p>}
        </div>



      </div>

    </div>
  )
}

export default ShopItem
