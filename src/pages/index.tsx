import { Product } from '@prisma/client';
import styled from 'styled-components';
import useSWR from 'swr';
// components
import FloatingButton from 'src/components/FloattingButton';
import ProductCard from '@components/Card/Product/ProductCard';
// api
import { getProductList } from 'src/api/product';
// assets
import Appbar from 'src/components/Layout/Appbar';
import Tabbar from 'src/components/Layout/Tabbar';
export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
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
        {product_data.data.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            image={product.image}
            comments={1}
            hearts={product._count?.favs}
          />
        ))}
      </HomeContainer>
      <Tabbar />
      <FloatingButton href="/products/upload" />
    </>
  );
};

export default Home;
