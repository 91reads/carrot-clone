import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";
import useSWRImmutable from 'swr/immutable';
import Link from "next/link";
import Image from "next/image";
// prisma
import { Product, User } from "@prisma/client";
// components
import Layout from "src/components/Layout";
// api
import { getProductDetail } from "src/api/product";
import { updateFavorite } from "src/api/favorite";
// lib
import { cls } from "src/libs/server/utils";
import { createChat } from 'src/api/chat';

interface ProductWithuser extends Product {
  user: User;
}
interface ItemDetailResponse {
  product: ProductWithuser;
  relatedProducts: Product[];
  isLiked: boolean;
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const product_detail = useSWRImmutable<ItemDetailResponse>(`/api/products/${router.query.id}`, () => getProductDetail(router.query.id as string));
  const { mutate } = useSWRConfig();
  const [toggle_fav, set_toggle_fav] = useState(product_detail.data ? product_detail.data.isLiked : false);

  useEffect(() => {
    if (!product_detail.data) return;

    set_toggle_fav(product_detail.data.isLiked);
  }, [product_detail.data])

  if (product_detail.error) return <div>...error</div>
  if (!product_detail.data) return <div>...loading</div>


  const onUpdateLike = () => {
    updateFavorite(router.query.id as string)
      .then(() => {
        set_toggle_fav(!toggle_fav);
        mutate(`/api/products`);
      })
      .catch((e) => {
        console.error(e);
        alert('Failed to Favorite');
      })
  }

  const onCreateChat = () => {
    createChat(product_detail.data?.product.id as number)
      .then(() => {
        alert('Success Create ChatRoom');
      })
      .catch(() => {
        alert('Failed to Create ChatRoom')
      })
  }

  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="relative pb-80">
            <Image
              src={`https://imagedelivery.net/PvvqDlv-2VYHUsYbyy-DlQ/${product_detail.data?.product?.image}/public`}
              className="h-96 bg-slate-300 object-fit"
              alt=""
              layout="fill"
            />
          </div>
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <Image
              src={`https://imagedelivery.net/PvvqDlv-2VYHUsYbyy-DlQ/${product_detail.data?.product?.user?.avatar}/avatar`}
              className="w-12 h-12 rounded-full bg-slate-300"
              alt=""
              width={48}
              height={48}
            />
            <div>
              <p className="text-sm font-medium text-gray-700">{product_detail.data.product.user.name}</p>
              <Link passHref href={`/users/profiles/${product_detail.data.product.user.id}`}>
                <p className="text-xs font-medium text-gray-500">
                  View profile &rarr;
                </p>
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">{product_detail.data.product.name}</h1>
            <span className="text-2xl block mt-3 text-gray-900">${product_detail.data.product.price}</span>
            <p className=" my-6 text-gray-700">
              {product_detail.data.product.description}
            </p>
            <div className="flex items-center justify-between space-x-2">
              <button style={{ width: '140px', height: '40px' }} onClick={onCreateChat}>
                Talk To Seller
              </button>
              <button
                onClick={onUpdateLike}
                className={cls(
                  "p-3 rounded-md flex items-center justify-center",
                  toggle_fav ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-gray-500"
                )}>
                {toggle_fav
                  ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>)
                  : (
                    <svg
                      className="h-6 w-6 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 28 28"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  )}
              </button>
            </div>
          </div>
        </div>
        <div>
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
        </div>
      </div>
    </Layout >
  );
};

export default ItemDetail;