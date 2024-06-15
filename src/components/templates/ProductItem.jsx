import Image from "next/image";
import Link from "next/link";

const ProductItem = ({ product }) => {
  const { slug, image, name, brand } = product;
  return (
    <div className="card">
      <Link href={`/product/${slug}`}>
        <Image
          src={image}
          alt={name}
          className="rounded shadow"
          width={300}
          height={300}
        />
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${slug}`}>
          <h2 className="text-lg">{name}</h2>
        </Link>
        <p>{brand}</p>
        <button className="primary-button" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
