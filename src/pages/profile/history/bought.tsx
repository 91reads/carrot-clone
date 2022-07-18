import type { NextPage } from 'next';
import useSWR from 'swr';
import Appbar from '@components/Layout/Appbar';
import styled from 'styled-components';
import ProductCard from '@components/Card/Product/ProductCard';
import Loading from '@components/Loading/Loading';
import useUser from '@libs/client/useUser';
import { getProductList } from 'src/api/product';
import { ProductWithCount } from 'src/pages';

const BoughtContainer = styled.div`
  margin-top: 5rem;
`;

const Bought: NextPage = () => {
  const product_data = useSWR<Array<ProductWithCount>>('/api/products', getProductList);
  const user_id = useUser();

  if (product_data.error) return <div>...에러</div>;
  if (!product_data.data) return  <Loading />

  const isCloseProduct = (product: any) => {
    if(product.status === 'close') return true
    else return false;
  }

  const isPurchase = (product: any) => {
    if(Number(product.buyer) === user_id) return true;
    else return false;
  }

  return (
    <>
      <Appbar title="구매 내역" />
      <BoughtContainer>
      {product_data.data.filter(isCloseProduct).filter(isPurchase).map((v: any) => {
          return (
            <ProductCard
              key={v.id}
              title={v.name}
              id={v.id}
              price={v.price}
              comments={v.chats.length}
              hearts={v._count.favs}
              image={v.image}
              updatedAt={v.updatedAt}
            />
          );
        })}
      </BoughtContainer>
    </>
  );
};

export default Bought;
