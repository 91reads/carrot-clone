import Link from "next/link";
import styled from 'styled-components';

interface ItemProps {
  title: string;
  id: number;
  price: number;
  comments: number;
  hearts: number;
}

const ItemContainer = styled.div`
  border-bottom: 1px solid var(--gray-2);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`;

const ItemBox = styled.div`
  display: flex;
`;

const ItemImage = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: var(--br-6);
  border: 1px solid red;
  margin-right: 2rem;
`;

const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    font-size: 1.6rem;
    line-height: 3rem;
    font-weight: var(--weight-500);
  }
  span {
    font-size: 1.4rem;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-end;
`;

const ItemInfoContent = styled.div`
  display: flex;
  align-items: center;
  width: 2.4rem;
  border: 1px solid rebeccapurple;
`;

export default function Item({
  title,
  price,
  comments,
  hearts,
  id,
}: ItemProps) {
  return (
    // <Link href={`/products/${id}`}>
    <ItemContainer>
      <ItemBox className="flex space-x-4">
        <ItemImage/>
        <ItemContent className="pt-2 flex flex-col">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <span className="font-medium mt-1 text-gray-900">${price}</span>
        </ItemContent>
      </ItemBox>
      <ItemInfo className="flex space-x-2 items-end justify-end">
        <ItemInfoContent className="flex space-x-0.5 items-center text-sm  text-gray-600">
          <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          <span>{hearts}</span>
        </ItemInfoContent>
        <ItemInfoContent className="flex space-x-0.5 items-center text-sm  text-gray-600">
          <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              >
              <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          <span>{comments}</span>
        </ItemInfoContent>
      </ItemInfo>
    </ItemContainer>
    // </Link>
  );
}