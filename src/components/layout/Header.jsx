"use client";

import { Store } from "@/utils/Store";
import Link from "next/link";
import { useContext } from "react";

const Header = () => {
  // =========== Context =============
  const { state } = useContext(Store);
  const { cart } = state;

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
          <Link href="/login" className="p-2">
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
