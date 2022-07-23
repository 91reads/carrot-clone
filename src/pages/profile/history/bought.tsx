import type { NextPage } from 'next';
import useSWR from 'swr';
import styled from 'styled-components';
import { ProductWithCount } from 'src/pages';
// components
import Appbar from '@components/Layout/Appbar/Appbar';
import ProductCard from '@components/Card/Product/ProductCard';
import Loading from '@components/Loading/Loading';
// api
import { getProductList } from 'src/api/product';
// lib
import useUser from '@libs/client/useUser';
import { ProductStructure } from '@libs/type/product_type';

const BoughtContainer = styled.div`
  margin-top: 5rem;
`;

const Bought: NextPage = () => {
  const product_data = useSWR<Array<ProductWithCount>>('/api/products', getProductList);
  const user_id = useUser();

  if (product_data.error) return <div>...에러</div>;
  if (!product_data.data) return  <Loading />

  const isCloseProduct = (product: ProductStructure) => {
    if(product.status === 'close') return true
    else return false;
  }

  const isPurchase = (product: ProductStructure) => {
    if(Number(product.buyer) === user_id) return true;
    else return false;
  }

  return (
    <>
      <Appbar title="구매 내역" />
      <BoughtContainer>
      {product_data.data.filter(isCloseProduct).filter(isPurchase).map((v: ProductWithCount) => {
          return (
            <ProductCard
              key={v.id}
              title={v.name}
              price={v.price}
              comments={v.chats.length}
              hearts={v._count.favs}
              image={v.image}
              updatedAt={v.updatedAt}
              status={v.status}
            />
          );
        })}
      </BoughtContainer>
    </>
  );
};

export default Bought;
