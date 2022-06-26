import type { NextPage } from "next";
import Layout from "src/components/Layout";
import ProductList from "src/components/Product-list";

const Bought: NextPage = () => {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="purchase" />
      </div>
    </Layout>
  );
};

export default Bought;