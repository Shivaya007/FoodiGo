import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    price: action.price,
                    qty: action.qty,
                    size: action.size,
                    img: action.img,
                },
            ];

        case "REMOVE":
            return state.filter((_, index) => index !== action.index);

        case "UPDATE":
            return state.map((food) =>
                food.id === action.id && food.size === action.size
                    ? {
                        ...food,
                        qty: parseInt(action.qty),
                        price: parseInt(action.qty) * (food.price / food.qty), // Ensure correct price calculation
                    }
                    : food
            );

        case "DROP":
            return [];

        default:
            console.log("Error in Reducer");
            return state; // ✅ Return current state to prevent crashes
    }
};

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
