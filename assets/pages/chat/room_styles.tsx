import styled from "styled-components";

export const RoomContainer = styled.div`
  padding-top: 5rem;
`;

export const RoomProductInfo = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--gray-2);
  display: flex;
  align-items: center;
  padding: 2rem;
  margin-bottom: 1rem;
  div {
    font-size: 1.4rem;
    padding-left: 1rem;
    line-height: 1.8rem;
    strong {
    }
    p {
      font-weight: var(--weight-600);
    }
  }

  select {
    border: 1px solid var(--gray-3);
    padding: 0.2rem;
    margin-left: 2rem;
  }
`;

export const RoomProductImage = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
`;

interface StyledProps {
  valid_button: boolean;
}
export const RoomButtonBox = styled.div<StyledProps>`
  position: absolute;
  display: flex;
  bottom: 0;
  background-color: var(--gray-1);
  width: 100%;
  height: 6.6rem;

  input {
    margin: 1rem;
    width: 100%;
    padding: 2rem 2rem 2rem 1.2rem;
    border-radius: var(--br-12);
    background-color: white;
    border: none;
  }
  button {
    svg {
      font-size: 2rem;
      color: ${({valid_button}) => valid_button ? 'var(--gray-4)' : 'var(--gray-2)'};
    }
    svg:hover {
      cursor: pointer;
    }
    border: none;
    border-radius: var(--br-12);
    background-color: transparent;
    margin: 1rem 1rem 1rem 0;
  }
`;