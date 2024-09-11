import React from 'react'
import { Link } from 'react-router-dom'

function Failed() {
  return (
    <div className='d-flex justify-content-center'>
     <div className="card text-bg-danger mb-3" style={{"max-width": "32rem"}}>
  <div className="card-header"></div>
  <div className="card-body">
    <h5 className="card-title">Payment Failed</h5>
    <p className="card-text">Sorry! due to some error payment failed!</p>
    <Link to="/usercart" className="btn btn-success">Go to Cart</Link>
  </div>
</div>
    </div>
  )
}

export default Failed
