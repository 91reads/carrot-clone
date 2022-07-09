import type { NextPage } from 'next';
import { getUserHistory } from 'src/api/user';
import useSWR from 'swr';
import ProductCard from '@components/Card/Product/ProductCard';
import Appbar from '@components/Layout/Appbar';
import styled from 'styled-components';

const SoldContainer = styled.div`
  margin-top: 5rem;
`;

const Sold: NextPage = () => {
  const history_data = useSWR(`/api/users/me/sales`, () => getUserHistory('sales'));

  if (history_data.error) return <div>...에러</div>;
  if (!history_data.data) return <div>...로딩중</div>;

  console.log(history_data.data);

  return (
    <>
      <Appbar title="나의 당근" />
      <SoldContainer>
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
      </SoldContainer>
    </>
  );
};

export default Sold;
