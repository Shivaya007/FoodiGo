import React ,{useState,useRef,useEffect} from 'react'
import { useDispatchCart,useCart} from './ContextReducer'
export default function Cardss(props) {
  let dispatch = useDispatchCart();
  const priceRef=useRef();
  let options =props.options;
  let data =useCart()
  let priceOptions=Object.keys(options);
  let foodItem = props.foodItems;
  const[qty, setQty] =  useState(1)
  const [size,setSize] = useState("")
  const handleAddToCart = async ()=>{
       await dispatch({type:"ADD",id:props.foodItems.id,name: props.foodItems.name,price: props.foodItems.finalPrice,qty:qty,size:size})
       console.log(data);
  }
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  let finalPrice = qty * parseInt(options[size]);
  return (

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
       <img
        src={foodItem.img}
        className="card-img-top"
        alt="Card Image"
        style={{ height: "120px", objectFit: "fill" }}
       />
       <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
       
          {/* Quantity Dropdown */}
          <select className="m-2 h-100 w-20 bg-success text-black rounded" onChange ={(e) => setQty(e.target.value)}>
            {[...Array(6).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>

          {/* Size Dropdown */}
          <select className="m-2 h-100 w-20 bg-success text-black rounded" ref={priceRef} onChange ={(e) => setSize(e.target.value)}>
            {priceOptions.map((data)=>{
            return (<option key={data} value ={data}>{data}</option>)
                        })}
          </select>

          {/* Final Price Display */}
          <div className="d-inline ms-2 h-100 w-20 fs-5">₹{finalPrice}/-</div>
        </div>
        <hr></hr>
        <button className={`btn btn-success justify-center ms-2`} onClick={handleAddToCart}>Add to Cart</button>
      </div>
      
    
  
        
    
  )
}
