import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useSWR from 'swr';
// components
import Appbar from '@components/Layout/Appbar/Appbar';
import Tabbar from '@components/Layout/Tabbar/Tabbar';
import Loading from '@components/Loading/Loading';
import ProductCard from '@components/Card/Product/ProductCard';
import FloatingButton from 'src/components/FloattingButton';
// api
import { getProductList } from 'src/api/product';
// lib
import useCoords from '@libs/client/useCoord';
import { ChatStructureType } from '@libs/type/chat_type';
import { ProductStructure } from '@libs/type/product_type';

export interface ProductWithCount extends ProductStructure {
  _count: {
    favs: number;
  };
  chats: Array<ChatStructureType>;
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
  if (!product_data.data) return <Loading />;

  const onMoveRouter = (id: number) => {
    router.push(`/products/${id}`);
  };

  const isSearch = (product: ProductStructure) => {
    if (!watch_search) return true;
    if (product.name.includes(watch_search.trim())) return true;
    else return false;
  };

  const isLive = (product: ProductStructure) => {
    if (product.status === 'live') return true;
    else false;
  };

  return (
    <>
      <Appbar title={coord} set_watch_search={set_watch_search} search={search} set_search={set_search} />
      <HomeContainer>
        {product_data.data
          .filter(isSearch)
          .filter(isLive)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((product) => (
            <ProductCard
              key={product.id}
              title={product.name}
              price={product.price}
              image={product.image}
              comments={product.chats.length}
              hearts={product._count?.favs}
              onClick={() => onMoveRouter(product.id)}
              updatedAt={product.createdAt}
              status={product.status}
            />
          ))}
      </HomeContainer>
      <FloatingButton href="/products/register" />
      <Tabbar />
    </>
  );
};

export default Home;
