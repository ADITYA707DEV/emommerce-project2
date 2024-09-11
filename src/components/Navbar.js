import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../css/Style1.css"
import { useSelector} from 'react-redux'
import Profile from './Profile'








function Navbar() {
const cartCount  = useSelector((state)=>{return state.userCart.cartCount})
const [searchBar,setSearchBar] = useState(null)
// const [searchParams, setSearchParams] = useSearchParams();

const navigate = useNavigate(null)
// const location = useLocation()
const onChange = (e)=>{
    setSearchBar(e.target.value)

}

const handleOnSubmit = (e)=>{
  e.preventDefault()
  if(searchBar !== null){
    // if(location.pathname == "/search"){
    //   console.log(searchParams.get('value'))
    //   setSearchParams(searchBar)
    // }
    navigate(`/search`, { state: { value: searchBar} })
  }
}
return (
<div className='p-3 d-flex container-fluid   responsiveNav1'>
<nav className="navbar navbar-expand-lg bg-primary rounded " style={{width:"95%"}}>
<div className="container-fluid responsiveNav1  ">

 <div><Link className="navbar-brand text-white d-flex align-items-center fw-bolder" to="/"><i className="fa-solid fa-tags mx-1"></i>shopit</Link></div> 
  
  <div className=" " id="navbarSupportedContent">
    <ul className="navbar-nav me-auto mb-2 mb-lg-0 responsiveNav1">
      <li className="nav-item">
      <Link className="nav-link text-white fw-bold" to="/">home</Link>
      </li>
      
      
      <li className="nav-item">
      <Link  className="nav-link text-white fw-bold" to="/login">login</Link>
      </li>
      <li className="nav-item">
      <Link  className="nav-link text-white fw-bold" to="/signup">SignUp</Link>
      </li>
      <li className="nav-item">
      <Link  className="nav-link text-white fw-bold" to="/trackingorder">orders</Link>
      </li>
    
    
     
      
      
     
     
    </ul>
 
   

  </div>
  <div className='d-flex  align-items-center responsiveNav1  '><form className="d-flex my-1" role="search" onSubmit={handleOnSubmit}>
      <input className="form-control me-2" type="search" placeholder="Search item here"  onChange={onChange} aria-label="Search"/>
      <button className="btn btn-outline-success text-white fw-bold btn-dark" type="submit">Search</button>
    </form>
    <Link className='nav-link mx-3 my-1' to={"/usercart"}><span><sup className='bg-dark fw-bold  px-1 rounded-circle text-white'>{cartCount}</sup><i className="fa-solid fa-cart-shopping" style={{color:"#ffffff"}}></i></span></Link> </div>
  
</div>

</nav>
<button className="btn btn-sm btn-primary m-1 responsivebtn1 " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
          account
        </button>
    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className='offcanvas-header bg-light border'><h1 className='offcanvas-title'>Profile</h1><button className='btn btn-close' data-bs-dismiss="offcanvas"></button></div>
      <div className='offcanvas-body'><Profile></Profile></div>
    </div>
</div>
  )
}

export default Navbar
