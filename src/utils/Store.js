"use client";

import { createContext, useEffect, useReducer, useState } from "react";

import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
  cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "INITIALIZE_CART": {
      return { ...state, cart: action.payload };
    }
    case "CART_RESET":
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: { ...state.cart.shippingAddress, ...action.payload },
        },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };
    default:
      return state;
  }
};

export function StoreProvider({ children }) {
  // ============== Context ===============
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  // ============== State ===============
  const [isInitialized, setisInitialized] = useState(false);

  // ============== Effect ===============
  useEffect(() => {
    const cart = Cookies.get("cart")
      ? JSON.parse(Cookies.get("cart"))
      : initialState.cart;
    dispatch({ type: "INITIALIZE_CART", payload: cart });
    setisInitialized(true);
  }, []);

  // ============== Rendering ===============
  if (!isInitialized) return null;

  return <Store.Provider value={value}>{children}</Store.Provider>;
}
