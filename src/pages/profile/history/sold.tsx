import type { NextPage } from 'next';
import useSWR from 'swr';
import styled from 'styled-components';
import { ProductWithCount } from 'src/pages';
// components
import ProductCard from '@components/Card/Product/ProductCard';
import Appbar from '@components/Layout/Appbar';
import Loading from '@components/Loading/Loading';
// api
import { getProductList } from 'src/api/product';
// lib
import useUser from '@libs/client/useUser';
import { ProductStructure } from '@libs/type/product_type';

const SoldContainer = styled.div`
  margin-top: 5rem;
`;

const Sold: NextPage = () => {
  const product_data = useSWR<Array<ProductWithCount>>('/api/products', getProductList);
  const user_id = useUser();

  if (product_data.error) return <div>...에러</div>;
  if (!product_data.data) return  <Loading />

  const isMyProduct = (product: ProductStructure) => {
    if(product.userId === user_id) return true
    else false;
  }

  return (
    <>
      <Appbar title="판매 내역" />
      <SoldContainer>
        {product_data.data.filter(isMyProduct).map((v: ProductWithCount) => {
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
      </SoldContainer>
    </>
  );
};

export default Sold;
