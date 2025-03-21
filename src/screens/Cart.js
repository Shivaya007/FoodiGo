<<<<<<< HEAD
import React from 'react'
import { useCart, useDispatchCart} from '../components/ContextReducer';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  let data =useCart();
  let dispatch = useDispatchCart();
  if(data.length===0){
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    // console.log(data,localStorage.getItem("userEmail"),new Date())
    let response = await fetch("http://localhost:5000/api/orderData", {
      // credentials: 'include',
      // Origin:"http://localhost:3000/login",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail,
        order_data: data,
    
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" })
    }
  }


  let totalPrice = data.reduce((total, food) => total + food.price, 0)
  return (
    <div>

      {console.log(data)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
=======
import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3">The Cart is Empty!</div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    try {
      let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/orderData`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString()
        })
      });

      if (response.status === 200) {
        dispatch({ type: "DROP" });
        alert("Order placed successfully!");
      } else {
        const errorMessage = await response.text();
        console.error("Order failed:", errorMessage);
        alert(`Order failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Failed to place order. Please try again later.");
    }
  };

  const handleDelete = (id) => {
    dispatch({ type: "REMOVE", id });
  };

  let totalPrice = data.reduce(
  (total, food) => total + (food.qty * Number(food.price || 0)), 
  0
);

console.log("Cart Data:", data);
console.log("Total Price:", totalPrice);

  return (
    <div>
      <div className="container m-auto mt-5 table-responsive">
        <table className="table table-hover">
          <thead className="text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col">Action</th>
>>>>>>> 04b3cae5e91c3d5656dc058712ec7a73a87ec9b0
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
<<<<<<< HEAD
              < tr className=' text-muted fs-4'>
                <th scope='row' >{index + 1}</th>
                <td >{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td ><button type="button" className="btn p-0"><DeleteIcon onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td></tr>
              ))}
      
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}
=======
              <tr key={index} className="text-muted fs-5">
                <th scope="row">{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>₹{food.price}</td>
                <td>{food.size}</td>
                <td>
                  {/* Delete Button */}
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDelete(food.id)}
                    style={{ padding: '5px 10px' }}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Total Price Section */}
        <div>
          <h1 className="fs-2">Total Price: ₹{totalPrice}</h1>
        </div>

        {/* Check Out Button */}
        <div>
          <button 
            className="btn bg-success mt-3" 
            onClick={handleCheckOut} 
            style={{ fontSize: '1.2rem', padding: '10px 20px' }}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
>>>>>>> 04b3cae5e91c3d5656dc058712ec7a73a87ec9b0
