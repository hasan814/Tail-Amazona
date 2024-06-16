import { useRouter } from "next/navigation";

const CalculateCart = ({ cartItems }) => {
  // =========== Router ============
  const router = useRouter();

  // =========== Rendering ============
  return (
    <div className="p-5 card m-5">
      <ul>
        <li>
          <div className="pb-3 text-xl">
            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) :$
            {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
          </div>
        </li>
        <li>
          <button
            onClick={() => router.push("/shipping")}
            className="primary-button w-full"
          >
            Check Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CalculateCart;
