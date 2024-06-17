"use client";

import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

import CheckoutWizard from "@/modules/CheckoutWizard";
import { Store } from "@/utils/Store";
import Cookies from "js-cookie";

const ShippingPage = () => {
  // =========== Router ===========
  const router = useRouter();

  // =========== Context ===========
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  // =========== State ===========
  const [formData, setFormData] = useState({
    fullName: shippingAddress.fullName || "",
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  });

  // =========== Effect ===========
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      fullName: shippingAddress.fullName || "",
      address: shippingAddress.address || "",
      city: shippingAddress.city || "",
      postalCode: shippingAddress.postalCode || "",
      country: shippingAddress.country || "",
    }));
  }, [shippingAddress]);

  // =========== Function ===========
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/shipping", {
      method: "POST",
      headers: { "Content-Type": "aaplication/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: formData });
      Cookies.set(
        "cart",
        JSON.stringify({ ...cart, shippingAddress: formData })
      );
      router.push("/payment");
    } else {
      toast.error("Failed To submit Shipping Data!");
    }
  };

  // =========== Rendering ===========

  return (
    <>
      <CheckoutWizard activeStep={1} />
      <Toaster />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="w-full"
            id="fullName"
            value={formData.fullName}
            onChange={handleChange}
            autoFocus
            placeholder="Full Name ..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="w-full"
            id="address"
            value={formData.address}
            onChange={handleChange}
            autoFocus
            placeholder="Address ..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            type="text"
            className="w-full"
            id="city"
            value={formData.city}
            onChange={handleChange}
            autoFocus
            placeholder="City ..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            className="w-full"
            id="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            autoFocus
            placeholder="PostalCode ..."
          />
        </div>
        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            className="w-full"
            id="country"
            value={formData.country}
            onChange={handleChange}
            autoFocus
            placeholder="Country ..."
          />
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </>
  );
};

export default ShippingPage;
