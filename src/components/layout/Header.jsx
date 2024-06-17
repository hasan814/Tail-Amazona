"use client";

import { useSession } from "next-auth/react";
import { useContext } from "react";
import { signOut } from "next-auth/react";
import { Store } from "@/utils/Store";

import UserMenu from "@/modules/UserMenu";
import Cookies from "js-cookie";
import Loader from "@/elements/Loader";
import Link from "next/link";

const Header = () => {
  // =========== Session =============
  const { data, status } = useSession();

  // =========== Context =============
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  // =========== Function =============
  const logoutHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/signin" });
  };

  // =========== Rendering =============
  return (
    <header>
      <nav className="flex h-12 justify-between shadow-md items-center px-4">
        <Link href={"/"} legacyBehavior>
          <a className="text-lg font-bold">amazona</a>
        </Link>
        <div>
          <Link href="/cart" className="p-2">
            Cart
            {cart.cartItems.length > 0 && (
              <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
              </span>
            )}
          </Link>
          <Link href="/signin" className="p-2">
            {status === "loading" ? (
              <Loader />
            ) : data?.user ? (
              <UserMenu data={data} logoutHandler={logoutHandler} />
            ) : (
              <Link href={"/signin"}>Sign In</Link>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
