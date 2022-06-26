import type { NextPage } from "next";
import Item from "src/components/Item";
import Layout from "src/components/Layout";
import useSWR from "swr";
import { Product } from "@prisma/client";
import ProductList from "src/components/Product-list";

const Sold: NextPage = () => {

  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
};

export default Sold;