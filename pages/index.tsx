import useSWRImmutable from 'swr/immutable';
// prisma
import { Product } from "@prisma/client";
// components
import FloatingButton from "@components/FloattingButton";
import Item from "@components/Item";
import Layout from "@components/Layout";
// api
import { getProductList } from "@libs/front-api/product";
import useSWR from 'swr';
export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  }
}
const Home = () => {
  const product_data = useSWR<Array<ProductWithCount>>('/api/products', getProductList);

  if (product_data.error) return <div>error</div>;
  if (!product_data.data) return <div>...loading</div>;

  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {product_data?.data?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={product._count?.favs}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

// export async function getServerSideProps() {
//   const products = await client.product.findMany({})
//   console.log(products);

//   return {
//     props: {
//       products: JSON.parse(JSON.stringify(products))
//     }
//   }
// }

export default Home;