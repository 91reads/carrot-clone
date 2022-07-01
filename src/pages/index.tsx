import { Product } from "@prisma/client";
// components
import FloatingButton from "src/components/FloattingButton";
import Item from "src/components/Item";
import Layout from "src/components/Layout";
// api
import { getProductList } from "src/api/product";
import useSWR from 'swr';

import styled from 'styled-components';
import Appbar from "src/components/Layout/Appbar";
import Tabbar from "src/components/Layout/Tabbar";
export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  }
}

const HomeContainer = styled.div`
padding-top: 5rem;
/* overflow: scroll; */
  /* padding: 2rem; */
`;

const Home = () => {
  const product_data = useSWR<Array<ProductWithCount>>('/api/products', getProductList);

  if (product_data.error) return <div>error</div>;
  if (!product_data.data) return <div>...loading</div>;

  return (
    // <Layout title="홈" hasTabBar>
    <>
      <Appbar title="home" />
      <HomeContainer>
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
          {/* <svg
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
          </svg> */}
          <Tabbar />
        </FloatingButton>
      </HomeContainer>
    </>
    // </Layout>
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