"use client";

import { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Store } from "@/utils/Store";

import ProductScreenPage from "@/templates/ProductScreenPage";

const ProductScreen = ({ params }) => {
  // =============== Router ===============
  const router = useRouter();

  // =============== Constant ===============
  const { slug } = params;

  // =============== State ===============
  const [product, setProduct] = useState(null);

  // =============== Context ===============
  const { state, dispatch } = useContext(Store);

  // =============== Effect ===============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        if (data) {
          const fetchedProduct = data.data.find((item) => item.slug === slug);
          setProduct(fetchedProduct);
        } else {
          toast.error(data.error);
        }
      } catch (error) {
        toast.error(error);
      }
    };
    fetchData();
  }, [slug]);

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
    toast.success("Product Added to Cart.");
  };

  // =============== Rendering ===============
  if (!product) return <div>Loading ...</div>;

  return (
    <div>
      <Toaster />
      <ProductScreenPage product={product} addToCartandler={addToCartHandler} />
    </div>
  );
};

export default ProductScreen;
