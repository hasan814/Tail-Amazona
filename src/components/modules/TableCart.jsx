import { v4 as uuidv4 } from "uuid";
import { FiXCircle } from "react-icons/fi";

import Image from "next/image";
import Link from "next/link";

const TableCart = ({ cartItems, removeItemHandler }) => {
  return (
    <div className="overflow-x-auto md:col-span-3">
      <table className="min-w-full">
        <thead className="border-b">
          <tr>
            <th className="px-5 text-left">Item</th>
            <th className="px-5 text-left">Quantity</th>
            <th className="px-5 text-left">Price</th>
            <th className="p-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={uuidv4()} className="border-b">
              <td>
                <Link href={`/product/${item.slug}`} legacyBehavior>
                  <a className="flex items-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                    />
                    &nbsp;{item.name}
                  </a>
                </Link>
              </td>
              <td className="p-5 text-right">{item.quantity}</td>
              <td className="p-5 text-right">{item.price}</td>
              <td className="p-5 text-center">
                <button onClick={() => removeItemHandler(item)}>
                  <FiXCircle className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCart;
