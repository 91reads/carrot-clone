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
import { useRouter } from 'next/router';
export interface ProductWithCount extends Product {
  _count: {
    favs: number;
  };
  chats: Array<any>;
}

const HomeContainer = styled.div`
  padding-top: 5rem;
`;

const Home = () => {
  const product_data = useSWR<Array<ProductWithCount>>('/api/products', getProductList);
  const router = useRouter();

  if (product_data.error) return <div>error</div>;
  if (!product_data.data) return <div>...loading</div>;

  const onMoveRouter = (id: number) => {
    router.push(`/products/${id}`);
  };

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
            comments={product.chats.length}
            hearts={product._count?.favs}
            onClick={() => onMoveRouter(product.id)}
            updatedAt={product.updatedAt}
          />
        ))}
      </HomeContainer>
      <FloatingButton href="/products/register" />
      <Tabbar />
    </>
  );
};

export default Home;
