import React from 'react'
import { useSelector } from 'react-redux'
import { useEffect,useState,useRef} from 'react'
import { setCookieData } from '../redux/userDataSlice'
import { resetCart } from '../redux/userDataSlice'
import { useDispatch } from 'react-redux'


function Profile() {
const details = useSelector((state)=>{return state.userData})

const dispatch = useDispatch()
const[userData,setUserData] = useState(null)
const[disable,setDisable] = useState(true)


const handleOnSelect = (e)=>{
setUserData({...userData,city:e.target.value})

}


const handleLogout = async ()=>{

const res = await fetch("http://localhost:5000/user/userlogout",{
  method: "GET",
  
   credentials: 'include'
  
})
const response = await res.json()
dispatch(resetCart())
setDisable(true)
}

const handleDelete = async  ()=>{
   const res = await fetch("http://localhost:5000/user/deleteUserAccount",{
    method:"DELETE",
    credentials:"include"
   })
   const response = await res.json()

   dispatch(resetCart())
   setDisable(true)
}

const handleDisable = ()=>{
  if(Object.keys(details.data).length === 0){
    setDisable(true)
  }
  else{
    return setDisable(false)
  }
 
}

const handleOnChange = (e)=>{
  setUserData({...userData, [e.target.name]:e.target.value})
  
     
}


const submit = async  (e)=>{
  e.preventDefault()
  
  const response = await fetch(("http://localhost:5000/user/getuserdetail"),{
    method:"POST",
    headers:{
      "Content-Type": "application/json"
    },
    credentials: 'include',
    body: JSON.stringify({
      userId: details.data.id,
      city: userData.city,
      address: userData.address,
      zip: userData.zip

    })
  })
  const res = await response.json()
  dispatch(setCookieData({name:res.user.name,email:res.user.email,id:res.user._id, city:res.user.city, zip: res.user.zip, address:res.user.address}))

}
 useEffect(()=>{
  handleDisable()
 
},[])


  return (
    <div>
     <div className="card ">
  <div className="card-header">
  Profile 
  </div>
  <div className="card-body">

  {Object.keys(details.data).length === 0?<div className="col-md-6">
    <span className="badge text-bg-danger">user need to login</span>
  </div>:<><div className='d-flex justify-content-between my-3'>
    <span>name: {details.data.name} </span><span>email: {details.data.email}</span>
    </div>
    <button className='btn btn-primary' onClick={handleLogout} >log out</button>
    <button className='btn btn-danger mx-2' onClick={handleDelete}>Delete</button></> 
    }
    <hr />
  {(details.data.city||details.data.zip||details.data.address) === undefined?<form className="row g-3" onSubmit={submit}>
  <div className="col-12">
    <label htmlFor="inputAddress" className="form-label">Address</label>
    <input type="text" name='address' id="inputAddress" placeholder="1234 Main St" onChange={handleOnChange} disabled={disable} required={true}/>
  </div>
  
 
  <div className="col-md-4">
    <label htmlFor="inputState" className="form-label">City</label>
    <select id="inputState" className="form-select" name='city' onClick={handleOnSelect} disabled={disable}> required={true}
      <option className='text-secondary' disabled={true}>shipment only in city below</option>
      <option value="chandigarh">chandigarh</option>
      <option value="mohali">mohali</option>
    </select>
  </div>
  <div className="col-md-2">
    <label htmlFor="inputZip" className="form-label">Zip</label>
    <input type="text" name='zip' id="inputZip" onChange={handleOnChange} disabled={disable} required={true}/>
  </div>
 
  <div className="col-12">
    <button type="submit" className="btn btn-primary"  disabled={disable}>Submit</button>
  </div>
</form>:<div><div className="d-flex  justify-content-between"><span>city: {details.data.city}</span><span>addres: {details.data.address}</span></div>
<hr/>
<div className="my-2">zip: {details.data.zip}</div></div>}
  </div>
</div>
    </div>
  )
}

export default Profile
