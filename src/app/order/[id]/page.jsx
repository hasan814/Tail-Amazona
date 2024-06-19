"use client";

import { useEffect, useReducer } from "react";
import OrderPage from "@/templates/OrderPage";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return {
        ...state,
        loading: false,
        error: action.payload.message || action.payload,
      };
    default:
      return state;
  }
};

const Order = ({ params }) => {
  // ============= Const =============
  const { id } = params;
  // ============= Reducer =============
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  const {
    shippingAddress,
    paymentMethod,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = order;

  // ============= Effect =============
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${id}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };
    if (!order._id || (order._id && order._id !== id)) fetchOrder();
  }, [id, order]);

  // ============= Rendering =============
  return (
    <OrderPage
      id={id}
      loading={loading}
      error={error}
      isPaid={isPaid}
      paidAt={paidAt}
      taxPrice={taxPrice}
      itemsPrice={itemsPrice}
      shippingPrice={shippingPrice}
      orderItems={orderItems}
      totalPrice={totalPrice}
      isDelivered={isDelivered}
      deliveredAt={deliveredAt}
      paymentMethod={paymentMethod}
      shippingAddress={shippingAddress}
    />
  );
};

export default Order;
