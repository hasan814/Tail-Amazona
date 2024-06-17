import { v4 as uuidv4 } from "uuid";

import ProductItem from "@/templates/ProductItem";
import data from "@/utils/data";

const Home = () => {
  const { products } = data;
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductItem key={uuidv4()} product={product} />
      ))}
    </div>
  );
};

export default Home;
