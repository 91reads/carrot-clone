import type { NextPage } from 'next';
import useSWR from 'swr';
import ProductCard from '@components/Card/Product/ProductCard';
import Appbar from '@components/Layout/Appbar';
import styled from 'styled-components';
import Loading from '@components/Loading/Loading';
import { ProductWithCount } from 'src/pages';
import { getProductList } from 'src/api/product';
import useUser from '@libs/client/useUser';

const SoldContainer = styled.div`
  margin-top: 5rem;
`;

const Sold: NextPage = () => {
  // const history_data = useSWR(`/api/users/me/sales`, () => getUserHistory('sales'));
  const product_data = useSWR<Array<ProductWithCount>>('/api/products', getProductList);
  const user_id = useUser();

  if (product_data.error) return <div>...에러</div>;
  if (!product_data.data) return  <Loading />

  const isMyProduct = (product: any) => {
    if(product.userId === user_id) return true
    else false;
  }

  return (
    <>
      <Appbar title="판매 내역" />
      <SoldContainer>
        {product_data.data.filter(isMyProduct).map((v: any) => {
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
              status={v.status}
            />
          );
        })}
      </SoldContainer>
    </>
  );
};

export default Sold;
