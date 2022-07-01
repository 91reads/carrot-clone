import type { NextPage } from "next";
import Layout from "src/components/Layout";
import ProductList from "src/components/Product-list";

const Loved: NextPage = () => {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
};

export default Loved;