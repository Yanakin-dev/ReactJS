import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cartItems: []

}

export const cart = createSlice({
    name: "cart",
    initialState,
    reducers: {
        createCartItem: (state, action) => {
            state.cartItems.push(action.payload);
        },
        updateItem: (state, action) => {
            state.cartItems.find(el => el.id === action.payload.id).quantity = Number(action.payload.value)
        },
        removeItem: (state, action) => {
            const indexToRemove = state.cartItems.findIndex(el => el.id === action.payload.id);
            state.cartItems.splice(indexToRemove, 1);
        }
    }
});


export function addOneToCart(action) {
    return function (dispatch, getState) {
        const storeState = getState();
        const isAlready = storeState.cart.cartItems.find(el => el.id === action)
        if (!isAlready) {
            const itemToAdd = storeState.products.items.find(el => el.id === action);
            const newCartItem = {
                ...itemToAdd,
                quantity: 1
            }
            dispatch(createCartItem(newCartItem));
        }
    }
}


export const { createCartItem, updateItem, removeItem } = cart.actions
export default cart.reducer