import CalculateCart from "@/modules/CalculateCart";
import TableCart from "@/modules/TableCart";
import Link from "next/link";

const CartPage = ({ cartItems, removeItemHandler }) => {
  return (
    <div>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is Empty. <Link href={"/"}>Go Shopping</Link>{" "}
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md-gap-5">
          <TableCart
            cartItems={cartItems}
            removeItemHandler={removeItemHandler}
          />
          <CalculateCart cartItems={cartItems} />
        </div>
      )}
    </div>
  );
};

export default CartPage;
