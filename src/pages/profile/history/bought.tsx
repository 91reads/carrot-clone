import type { NextPage } from 'next';
import { getUserHistory } from 'src/api/user';
import useSWR from 'swr';
import Appbar from '@components/Layout/Appbar';
import styled from 'styled-components';
import ProductCard from '@components/Card/Product/ProductCard';
import Loading from '@components/Loading/Loading';

const BoughtContainer = styled.div``;

const Bought: NextPage = () => {
  const history_data = useSWR(`/api/users/me/purchase`, () => getUserHistory('purchase'));

  if (history_data.error) return <div>...에러</div>;
  if (!history_data.data) return  <Loading />

  console.log(history_data.data);

  return (
    <>
      <Appbar title="나의 당근" />
      <BoughtContainer>
        {history_data.data.map((v: any) => {
          return (
            <ProductCard
              key={v.product.id}
              title={v.product.name}
              id={v.product.id}
              price={v.product.price}
              comments={v.product.chats.length}
              hearts={v.product._count.favs}
              image={v.product.image}
              updatedAt={v.product.updatedAt}
            />
          );
        })}
      </BoughtContainer>
    </>
  );
};

export default Bought;
