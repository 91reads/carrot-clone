import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import useSWRImmutable from 'swr/immutable';
import Link from 'next/link';
import Image from 'next/image';
// prisma
import { Product, User } from '@prisma/client';
// components
// api
import { getProductDetail } from 'src/api/product';
import { updateFavorite } from 'src/api/favorite';
// lib
import { createChat } from 'src/api/chat';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Appbar from '@components/Layout/Appbar';
import { getPrevDate } from '@libs/format';

interface ProductWithuser extends Product {
  user: User;
}
interface ItemDetailResponse {
  product: ProductWithuser;
  relatedProducts: Product[];
  isLiked: boolean;
}

export const DetailContainer = styled.div`
  padding-top: 5rem;
`;

export const RegisterContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  font-size: 1.4rem;
  line-height: 2.8rem;
  strong {
    font-size: 1.6rem;
    font-weight: var(--weight-600);
  }

  b {
    color: var(--gray-2);
  }
`;

const RegisterProfileContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-bottom: 1px solid var(--gray-1);
  div {
    display: flex;
    flex-direction: column;
    padding-left: 1rem;
    font-size: 1.6rem;
    p {
      font-size: 1.2rem;
      line-height: 2rem;
      color: var(--gray-2);
    }
  }
`;

export const RegisterInfoContent = styled.div`
  display: flex;
  padding: 1rem 2rem;
  border-top: 1px solid var(--gray-1);
  border-bottom: 1px solid var(--gray-1);
  div {
    display: flex;
    align-items: center;
    p {
      padding: 0 0.4rem 0 0.4rem;
      font-size: 1.2rem;
    }
  }
`;

const RegisterImage = styled.div`
  width: 100%;
  padding-bottom: 2rem;
`;

const TabbarContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  height: 6.6rem;
  width: 100%;

  background-color: white;
`;

interface InnerWrapStyle {
  width: number;
}

const TabbarInnerWrap = styled.div<InnerWrapStyle>`
  position: fixed;
  padding: 1rem 0rem;
  width: ${({ width }) => width && `${width}px`};
  border-top: 1px solid var(--gray-2);
`;

const TabbarWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-left: 1rem;
`;

const TabbarItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 4rem;

  font-size: 1.4rem;
  font-weight: var(--weight-500);
  button {
    font-size: 1.4rem;
    font-weight: var(--weight-500);
    border: none;
    background-color: transparent;
    svg {
      position: relative;
      top: 0.2rem;
      font-size: 2rem;
    }
  }
`;

const ItemDetail = () => {
  const router = useRouter();
  const product_detail = useSWRImmutable<ItemDetailResponse>(`/api/products/${router.query.id}`, () =>
    getProductDetail(router.query.id as string),
  );
  const { mutate } = useSWRConfig();
  const [toggle_fav, set_toggle_fav] = useState(product_detail.data ? product_detail.data.isLiked : false);

  const ref = useRef<HTMLHeadingElement>(null);
  const [parent_width, set_parent_width] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    set_parent_width(ref.current.offsetWidth);
  }, []);

  useEffect(() => {
    if (!product_detail.data) return;

    set_toggle_fav(product_detail.data.isLiked);
  }, [product_detail]);

  if (product_detail.error) return <div>...error</div>;
  if (!product_detail.data) return <div>...loading</div>;

  const onUpdateLike = () => {
    updateFavorite(router.query.id as string)
      .then(() => {
        set_toggle_fav(!toggle_fav);
        mutate(`/api/products`);
      })
      .catch((e) => {
        console.error(e);
        alert('Failed to Favorite');
      });
  };

  const onCreateChat = () => {
    createChat(product_detail.data?.product.id as number)
      .then(() => {
        alert('Success Create ChatRoom');
      })
      .catch(() => {
        alert('Failed to Create ChatRoom');
      });
  };

  return (
    <>
      <Appbar />
      <DetailContainer>
        <RegisterImage>
          <Image
            src={`https://imagedelivery.net/PvvqDlv-2VYHUsYbyy-DlQ/${product_detail.data?.product?.image}/public`}
            width={280}
            height={280}
            alt=""
            layout="responsive"
          />
        </RegisterImage>
        <RegisterProfileContainer>
          {product_detail.data.product.user.avatar ? (
            <Image
              src={`https://imagedelivery.net/PvvqDlv-2VYHUsYbyy-DlQ/${product_detail.data?.product?.user?.avatar}/avatar`}
              className="w-12 h-12 rounded-full bg-slate-300"
              alt=""
              width={48}
              height={48}
            />
          ) : (
            <div style={{ width: '6rem', height: '6rem', backgroundColor: 'red' }}></div>
          )}
          <div>
            <strong>{product_detail.data.product.user.name}</strong>
            <Link passHref href={`/users/profiles/${product_detail.data.product.user.id}`}>
              <p>View profile &rarr;</p>
            </Link>
          </div>
        </RegisterProfileContainer>
        <RegisterContent className="mt-5">
          <strong>{product_detail.data.product.name}</strong>
          <b>{getPrevDate(product_detail.data.product.createdAt)}</b>
          <p>{product_detail.data.product.description}</p>
        </RegisterContent>
        {/* <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {product_detail.data.relatedProducts.map((product) => (
              <Link key={product.id} passHref href={`/products/${product.id}`}>
                <div>
                  <div className="h-56 w-full mb-4 bg-slate-300" />
                  <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                  <span className="text-sm font-medium text-gray-900">${product.price}</span>
                </div>
              </Link>
            ))}
          </div>
        </div> */}
      </DetailContainer>
      <TabbarContainer ref={ref}>
        <TabbarInnerWrap width={parent_width}>
          <TabbarWrap>
            <TabbarItemBox>
              <button onClick={onUpdateLike}>
                <FavoriteBorderIcon style={{ fill: toggle_fav ? 'red' : 'black' }} />
              </button>
              <p>{product_detail.data.product.price}만원</p>
            </TabbarItemBox>
            <TabbarItemBox>
              <button style={{ width: '140px', height: '40px' }} onClick={onCreateChat}>
                채팅하기
              </button>
            </TabbarItemBox>
          </TabbarWrap>
        </TabbarInnerWrap>
      </TabbarContainer>
    </>
  );
};

export default ItemDetail;
