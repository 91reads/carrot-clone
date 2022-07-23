import styled from "styled-components";

export const TabbarContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;

  height: 6.6rem;
  width: 100%;
`;

interface InnerWrapStyle {
  width: number;
}

export const TabbarInnerWrap = styled.div<InnerWrapStyle>`
  position: fixed;
  padding: 1rem 2rem;
  width: ${({ width }) => width && `${width}px`};
  border-top: 1px solid var(--gray-2);
  z-index: 99999;
  background-color: white;
`;

export const TabbarWrap = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 0 1rem 0 1.2rem;
  margin-left: 1rem;
`;

export const TabbarItemBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  strong {
    padding-top: 0.8rem;
    font-size: 1.2rem;
  }
`;