import styled from 'styled-components';

export const ProductContainer = styled.div`
  border-bottom: 1px solid var(--gray-2);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

export const ProductBox = styled.div`
  display: flex;
`;

export const ProductImage = styled.div`
  width: 10rem;
  height: 10rem;
  border-radius: var(--br-6);
  margin-right: 2rem;
`;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  line-height: 2.8rem;
  strong {
    font-size: 1.6rem;
  }
  b {
    color: var(--gray-2);
    font-size: 1.4rem;
  }
  p {
    display: flex;
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0rem 0.6rem;
      margin-right: 0.6rem;
      border-radius: var(--br-6);
      font-size: 1.2rem;
      color: white;
      background-color: black;
    }
    font-weight: var(--weight-500);
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: end;
  justify-content: flex-end;
`;

export const ProductInfoContent = styled.div`
  display: flex;
  align-items: center;

  p {
    padding: 0 0.4rem 0 0.4rem;
    font-size: 1.4rem;
  }
`;
