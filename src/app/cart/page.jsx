"use client";

import { useContext } from "react";
import { Store } from "@/utils/Store";

import CartPage from "@/templates/CartPage";

const Cart = () => {
  // ============ Context ============
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  // ============ Function ============
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  // ============ Rendering ============
  return (
    <CartPage cartItems={cartItems} removeItemHandler={removeItemHandler} />
  );
};

export default Cart;
