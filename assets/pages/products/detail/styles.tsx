import styled from 'styled-components';
export const DetailContainer = styled.div`
  padding-top: 5rem;
`;
export const DetailProfileImage = styled.div`
  display: flex;
  align-items: center !important;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: green;
  position: relative;
`;

export const DetailProfileContent = styled.div``;

export const DetailContent = styled.div`
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

export const DetailProfileContainer = styled.div`
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

export const DetailImage = styled.div`
  width: 100%;
`;

export const TabbarContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  height: 6.6rem;
  width: 100%;

  border-top: 1px solid var(--gray-2);
  background-color: white;
`;

interface InnerWrapStyle {
  width: number;
}

export const TabbarWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  margin-left: 1rem;
`;

export const TabbarItemBox = styled.div`
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
  p {
    border-left: 1px solid var(--gray-2);
    padding: 0.8rem;
  }
  button:last-child {
    background-color: var(--primary);
    margin-right: 1rem;
    border-radius: var(--br-12);
    color: white;
  }
`;
