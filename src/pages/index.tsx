import { Product } from "@prisma/client";
// components
import FloatingButton from "src/components/FloattingButton";
import Item from "src/components/Item";
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
`;

const Home = () => {
  const product_data = useSWR<Array<ProductWithCount>>('/api/products', getProductList);

  if (product_data.error) return <div>error</div>;
  if (!product_data.data) return <div>...loading</div>;

  return (
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
          <Tabbar />
        </FloatingButton>
      </HomeContainer>
    </>
  );
};

export default Home;