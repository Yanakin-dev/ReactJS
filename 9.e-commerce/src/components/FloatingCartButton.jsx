import { useState } from "react"
import { useSelector } from "react-redux"
import ShoppingCart from "../assets/shopping-cart.svg"
import { createPortal } from "react-dom";
import Cart from "./Cart";

export default function FloatingCartButton() {

    const [showModal, setShowModal] = useState(false);
    const cart = useSelector(state => state.cart)

    return (
        <>
            <button onClick={ () => setShowModal(true) } className="fixed py-2 px-4 top-5 right-5 bg-slate-100 rouded flex justify-center items-center">
                <img className="w-6 h-6 mr-4"src={ ShoppingCart } alt="" />
                <span className="text-lg font-semi-bold">View your cart : { cart.cartItems.length }</span>
            </button>
            { showModal && createPortal(<Cart onClose={ () => setShowModal(false) } />, document.body) }
        </>
    )
}