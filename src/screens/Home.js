import React, {useState,useEffect} from "react";
import Navbar from '../components/Navbar';
import Cardss from '../components/Cardss';
import Footer from '../components/Footer';

import Carousal from '../components/Carousal';


export default function Home() {
  const [foodCat,setFoodCat] = useState([]);
  const [foodItem,setFoodItem] = useState([]);


  const loadData = async () =>{
    let response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/foodData`,{
      method:"POST",
      headers:{
        'content-Type':'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    console.log(response[0],response[1]);

  }

  useEffect(()=>{
        loadData()
  },[])
  return (
  <div>
      <div><Navbar /></div>
      <div><Carousal/></div>
      <div className="container">
       {
         foodCat !==[] ? foodCat.map((data)=>{
              return (<div className='row mb-3'>
                <div key ={data._id} className="fs-3 m-3">
                {data.CategoryName}
                </div>
                 <hr/>
                {foodItem !==[]? foodItem.filter((item)=> item.CategoryName === data.CategoryName).map(filterItems=>{
                  return(
                    <div key ={filterItems._id} className="col-12 col-md-6 col-lg-3">
                    <Cardss foodItems={filterItems}
                    options={filterItems.options[0]}
                    

                    />
                    </div>
                  )
                }):<div>no such data found</div>}
                </div>
              )
         })
         : <div>""""""""""</div>
       }
      
      
      </div>
      <div><Footer/>
    </div>
</div>  
);
}

