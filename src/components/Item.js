import React from 'react'
import sample from "../images/sample.png"
import { useSelector, useDispatch } from 'react-redux'
import { useRef, useState, useEffect } from 'react'





import { setCart } from '../redux/cartSlice'


function Item() {

  const reviewRef = useRef(null)
  const [overallRating, setOverallRating] = useState(0)

  const item = useSelector((state) => { return state.userItem.item })
  const details = useSelector((state)=>{return state.userData})
  const Dispatch = useDispatch()
  const [customerReviews, setCustomerReviews] = useState({ reviews: [] })
  const [choiceCart, setChoiceCart] = useState(item)

  
const handleSize = (e)=>{
// setChoiceCart({size:e.target.value})
// Object.assign(choiceCart,item)
 setChoiceCart({...choiceCart,size:e.target.value})
}

const handleCart = (e) => {
  e.preventDefault()

    Dispatch(setCart(choiceCart))

  }


  const updateMainReview = async () => {
    const res = await fetch("http://localhost:5000/items/overallreviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
      
        productId: item._id,
        overallRating: overallRating
      })

    })

    const response = await res.json()

  }
  const setStars = (r) => {
    let s = document.querySelectorAll(".fa-star")


  }

  const setRating = (rev) => {
    let r = 0
    if (rev.length !== 0) {
      for (let i = 0; i < rev.length; i++) {

        r += rev[i].rating

      }

      setOverallRating(Math.round(r / rev.length * 10) / 10)
      setStars(Math.round(r / rev.length * 10) / 10)




    }


  }



  const seeReviews = async () => {
    const response = await fetch("http://localhost:5000/items/getreviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: item._id
      })
    })
    const res = await response.json()
   
    setCustomerReviews({ reviews: res.reviews })

    setRating(res.reviews)


  }

  useEffect(() => {
    updateMainReview()
  }, [overallRating])

  useEffect(() => {
    seeReviews()

  }, [])

  const postReview = async () => {
    const text = document.getElementById("userReview").value
    const rate = parseFloat(document.getElementById("userRating").value)


    const response = await fetch("http://localhost:5000/items/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user:details.data.name,
        email:details.data.email,
        productId: item._id,
        description: text,
        rating: rate,
        overallRating: overallRating
      })
    })

    const res = await response.json()

    seeReviews()
  }
  return (
    <div className='container py-5' >
      {/* modal launch button */}
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={reviewRef}>

      </button>

      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Reviews</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              {/* review list */}
              <ul className="list-group">
              {Object.keys(details.data).length?  <div className="card border-0 bg-light">
                  <div className="card-body">
                    <h5 className="card-title">user1</h5>
                    <textarea name="userReview" id="userReview" rows="5" style={{ width: "100%" }} placeholder='enter you review here'></textarea>
                    <p className='d-inline'>rating: </p>
                    <input type="text" placeholder='enter rating out of 5' id='userRating' />
                    <button className='btn btn-sm btn-primary d-block my-1' onClick={postReview}>Post</button>
                  </div>

                </div>:<div className="card border-0 bg-light">
                <div className="card-body">need an account to post review</div></div>}



                {(customerReviews.reviews).map((rv) => {

                  return (<li className="list-group-item "><div className="card" >
                    <div className="card-body">
                
                      <div className=" fs-4 d-flex justify-content-between">{rv.user}       <span className='badge text-bg-warning align-self-end' >{rv.rating}</span></div>
                      <small className='fw-light '>{rv.email}</small>
                      <p className="card-text  my-3">{rv.description}</p>

                    </div>
                  </div>
                  </li>)

                })}


              </ul>
            </div>
          
          </div>
        </div>
      </div>

      {/* item */}
      <div className='row'>
        <div className="col-sm-4 border border-2 rounded flex p-4" style={{ height: "400px", textAlign: "center" }} ><img src={item.src} style={{ maxHeight: "100%" }} alt="" className='w-75 rounded' /></div>
        <div className="col-sm-8">
          <div className="card" style={{ width: "100%", height: "24rem" }}>
            <div className="card-body">
              <h5 className="card-title">{item.clothingType}</h5>
              <h6 className="card-subtitle mb-2 text-body-secondary">reviews: {overallRating}
                <span><i className="fa-regular fa-star"></i>
                  <i className="fa-regular fa-star" ></i>
                  <i className="fa-regular fa-star" ></i>
                  <i className="fa-regular fa-star" ></i>
                  <i className="fa-regular fa-star" ></i>
                </span>
                <span style={{ cursor: "pointer" }} onClick={() => { reviewRef.current.click() }}>({(customerReviews.reviews).length})
                </span>
              </h6>
              <p className="card-text">price: {item.price}</p>
              <div className="card-text "><span className='mx-1'>size:</span>
                <form onSubmit={handleCart}>{ item.size&& item.size.map((size,i)=>{return <div class="form-check form-check-inline mx-1">
                  <input class="form-check-input" type="radio" name="size" id="size" value={`${size}`}  onChange={handleSize} required={true}/>
                  <label class="form-check-label" for="inlineRadio1">{size}</label>
                </div>})}  <button type='submit' className='btn btn-primary d-block my-2' >add to cart</button></form>
              </div>
          
            
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item