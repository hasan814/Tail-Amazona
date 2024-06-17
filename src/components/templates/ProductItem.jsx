"use client";

import { toast, Toaster } from "react-hot-toast";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Store } from "@/utils/Store";

import Image from "next/image";
import Link from "next/link";

const ProductItem = ({ product }) => {
  // =============== Router ===============
  const router = useRouter();

  // =============== Context ===============
  const { state, dispatch } = useContext(Store);

  // =============== Constant ===============
  const { slug, image, name, brand } = product;

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
    <div className="card">
      <Toaster />
      <Link href={`/product/${slug}`}>
        <Image
          src={image}
          alt={name}
          className="rounded shadow"
          width={400}
          height={300}
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${slug}`}>
          <h2 className="text-lg">{name}</h2>
        </Link>
        <p>{brand}</p>
        <button
          className="primary-button"
          type="button"
          onClick={addToCartHandler}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
