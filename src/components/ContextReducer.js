import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

<<<<<<< HEAD
const reducer=(state,action)=>{
=======
const reducer = (state, action) => {
>>>>>>> 04b3cae5e91c3d5656dc058712ec7a73a87ec9b0
    switch (action.type) {
        case "ADD":
            return [...state, { 
                id: action.id, 
                name: action.name, 
                price: action.price, 
                qty: action.qty, 
                size: action.size, 
                img: action.img 
            }];
<<<<<<< HEAD
        
        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;
        
        case "UPDATE":
            let arr = [...state];
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price);
                    arr[index] = { 
                        ...food, 
                        qty: parseInt(action.qty), 
                        price: action.price // ✅ Fix here 
                    };
                }
                return arr;
            });
            return arr;
        case "DROP":
            let empArray = []
            return empArray
        default:
            console.log("Error in Reducer");
            return state;
    }
};

=======

        case "REMOVE":
            return state.filter((_, index) => index !== action.index);

        case "UPDATE":
            return state.map((food) =>
                food.id === action.id
                    ? { 
                        ...food, 
                        qty: parseInt(action.qty), 
                        price: action.price * parseInt(action.qty) 
                    }
                    : food
            );

        case "DROP":
            return [];

        default:
            console.log("Error in Reducer");
            return state; // ✅ Return current state to prevent errors
    }
};
>>>>>>> 04b3cae5e91c3d5656dc058712ec7a73a87ec9b0

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
