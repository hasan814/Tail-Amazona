import Image from "next/image";
import Link from "next/link";

const ProductScreenPage = ({ product, addToCartandler, cart }) => {
  const {
    image,
    name,
    category,
    brand,
    rating,
    price,
    numReviews,
    description,
    countInStock,
  } = product;
  return (
    <div>
      <div className="py-2">
        <Link href={`/`}>Back to Products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={image}
            alt={name}
            width={640}
            height={640}
            layout="responsive"
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{name}</h1>
            </li>
            <li>Category: {category}</li>
            <li>Brand: {brand}</li>
            <li>
              {rating} of {numReviews} reviews
            </li>
            <li>Description: {description}</li>
          </ul>
        </div>
        <div className="card p-5">
          <div className="mb-2 flex justify-between">
            <div>Price</div>
            <div> $ {price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status</div>
            <div> {countInStock > 0 ? "In Stock" : "Unavailable"}</div>
          </div>
          <button className="primary-button w-full" onClick={addToCartandler}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductScreenPage;
