import { v4 as uuidv4 } from "uuid";

import ProductItem from "@/templates/ProductItem";

const Home = async () => {
  // ============ Fetch =============
  const response = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const data = await response.json();
  const products = data.data;
  // ============ Rendering =============
  if (data.error) return <h3 className="">There is an error Hapened</h3>;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductItem key={uuidv4()} product={product} />
      ))}
    </div>
  );
};

export default Home;
