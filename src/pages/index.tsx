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
import { useState } from 'react';
import useCoords from '@libs/client/useCoord';
import Loading from '@components/Loading/Loading';

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
  const [search, set_search] = useState(false);
  const [watch_search, set_watch_search] = useState('');
  const coord = useCoords();

  if (product_data.error) return <div>error</div>;
  if (!product_data.data) return <Loading />

  const onMoveRouter = (id: number) => {
    router.push(`/products/${id}`);
  };

  const onSearchFilter = (product: any) => {
    if (!watch_search) return true;
    if (product.name.includes(watch_search)) return true;
    else return false;
  };

  return (
    <>
      <Appbar title={coord} set_watch_search={set_watch_search} search={search} set_search={set_search} />
      <HomeContainer>
        {product_data.data.filter(onSearchFilter).map((product) => (
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
            watch_search={watch_search}
          />
        ))}
      </HomeContainer>
      <FloatingButton href="/products/register" />
      <Tabbar />
    </>
  );
};

export default Home;
