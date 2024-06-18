"use client";

import { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { payments } from "@/utils/helper";
import { Store } from "@/utils/Store";

import CheckoutWizard from "@/modules/CheckoutWizard";
import Cookies from "js-cookie";

const PaymentPage = () => {
  // ============ Context ===========
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  // ============ Router ===========
  const router = useRouter();

  // ============ State ===========
  const [selectedPaymentMethod, setSelectdPaymentMethod] = useState("");

  // ============ Effect ===========
  useEffect(() => {
    if (!shippingAddress.address) return router.push("/shipping");
    setSelectdPaymentMethod(paymentMethod || "");
  }, [paymentMethod, router, shippingAddress]);

  // ============ Function ===========
  const submitHandler = (event) => {
    event.preventDefault();
    if (!selectedPaymentMethod)
      return toast.error("Payment method is required");
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({ ...cart, paymentMethod: selectedPaymentMethod })
    );
    router.push("/placeorder");
  };

  // ============ Rendering ===========
  return (
    <>
      <CheckoutWizard activeStep={2} />
      <Toaster />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Payment Method</h1>
        {payments.map((payment) => (
          <div key={uuidv4()} className="mb-4">
            <input
              type="radio"
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectdPaymentMethod(payment)}
            />
            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push("/shipping")}
            type="button"
            className="default-button"
          >
            Back
          </button>
          <button className="primary-button">Next</button>
        </div>
      </form>
    </>
  );
};

export default PaymentPage;
