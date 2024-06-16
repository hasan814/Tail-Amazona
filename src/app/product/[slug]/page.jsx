"use client";

import { useContext } from "react";
import { Store } from "@/utils/Store";

import ProductScreenPage from "@/templates/ProductScreenPage";
import data from "@/utils/data";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProductScreen = ({ params }) => {
  // =============== Router ===============
  const router = useRouter();

  // =============== Constant ===============
  const { slug } = params;
  const { products } = data;
  const product = products.find((item) => item.slug === slug);

  // =============== Context ===============
  const { state, dispatch } = useContext(Store);

  // =============== Function ===============
  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      toast.error("Sorry. Product is out of stock");
      return;
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };

  // =============== Rendering ===============
  return (
    <div>
      <Toaster />
      <ProductScreenPage product={product} addToCartandler={addToCartHandler} />
    </div>
  );
};

export default ProductScreen;
