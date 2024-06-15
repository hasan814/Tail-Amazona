import ProductScreenPage from "@/templates/ProductScreenPage";
import data from "@/utils/data";

const ProductScreen = ({ params }) => {
  const { slug } = params;
  const { products } = data;
  const product = products.find((item) => item.slug === slug);

  return <ProductScreenPage product={product} />;
};

export default ProductScreen;
