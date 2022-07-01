import styled from 'styled-components';

export const ProductContainer = styled.div`
  border-bottom: 1px solid var(--gray-2);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
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
  h3 {
    font-size: 1.6rem;
    line-height: 3rem;
    font-weight: var(--weight-500);
  }
  span {
    font-size: 1.4rem;
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
