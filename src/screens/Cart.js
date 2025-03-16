import React from 'react'
import { useCart, useDispatchCart} from '../components/ContextReducer';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  let data =useCart();
 // console.log("Cart Data:", data);
  console.log(data.price);
  let dispatch = useDispatchCart();
  if(data.length===0){
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )}
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
    
  
    let totalPrice = data.reduce(
      (total, food) => total + (food.qty * (food.price || food.options?.price || 0)),
      0
    );
    

console.log(totalPrice);

  return (
    <div>

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
            </tr>
          </thead>
          <tbody>
          console.log(data.price);
          {data.map((food, index) => (
  <tr key={index} className='text-muted fs-4'>
    <th scope='row'>{index + 1}</th>
    <td>{food.name}</td>
    <td>{food.qty}</td>
    <td>{food.size}</td>
    <td>{food.qty * food.price}</td>
    <td>
    <button className='btn bg-success mt-5' 
  onClick={handleCheckOut}
  style={{ fontSize: '1.2rem', padding: '10px 20px' }}>
  Check Out
</button>

    </td>
  </tr>
))}

          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {data.reduce(
      (total, food) => total + (food.qty * (food.price || food.options?.price || 0)),
      0
    )}</h1></div>
        <div>
          <button className='btn bg-success mt-5 ' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>



    </div>
  )
}