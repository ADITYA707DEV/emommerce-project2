import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Carousel from './Carousel'
import { resetCardType } from '../redux/cardTypeSlice'
import "../css/Style1.css"

  function Home() {
  
    const navigate = useNavigate(null)
    const dispatch = useDispatch()


    const keeperDetails = useSelector((state)=>{ return state.keeperDetails.details})
    
    const categoryimage = useSelector((state)=>{ return state.keeperDetails.categoryimg})
   

   

    const handleOnClick = (value) => {
    dispatch(resetCardType())
      navigate(`/card`, { state: { value: value } })
    }
    return (
      <>
     <div className='container-fluid'>
       <Carousel  ></Carousel>
        <div className='container p-5 my-2 w-75 border border-light shadow-sm'>
          <div className="row row-cols-1 row-cols-md-3 g-4">
           {categoryimage !== undefined?categoryimage.map((cat)=>{ return <div key={cat._id} className="col">
              <div className="card h-100">
                <img src={cat.categoryimage.url} className="card-img-top" alt="..."  />
                <div className="card-body">
                  <h5 className="card-title">{cat.categorytype}</h5>
                  <p className="card-text">All {cat.categorytype} Ware</p>
                  <button className='btn btn-outline-primary' onClick={() => { handleOnClick(cat.categorytype) }} >see</button>
                </div>
              </div>
            </div>}):<div>waiting</div>}

          </div>
       
        </div>
       
        {keeperDetails&&<div className='d-flex justify-content-around w-100 bg-primary p-2 rounded text-white p-2'>
          <div className='my-4'>
            <div  className='fw-semibold fs-4  my-1'>contact Us</div>
            <span className='spanWidth'>{keeperDetails.phone}</span>
          </div>
          <div className='my-4 mx-2'>
            <div  className='fw-semibold fs-4   my-1'>email</div>
            <span className='spanWidth'>{keeperDetails.email}</span>
          </div>
          <div className='my-4'>
            <div className='fw-semibold fs-4 my-1 ' >Ofiice</div>
           <span className='d-block spanWidth'>{keeperDetails.shopName}</span>
           <span className='spanWidth'>{keeperDetails.officeaddress}</span>
          </div>
          

        </div>}
        </div>
      </>
    )
  }

export default Home
