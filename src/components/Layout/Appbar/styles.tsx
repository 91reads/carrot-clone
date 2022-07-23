import styled from "styled-components";

interface InnerWrapStyle {
  width: number;
}

export const AppbarContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  min-height: 5rem;
  max-height: 5rem;
  z-index: 100;

  font-size: 1.4rem;
  h3 {
    font-size: 2rem;
    line-height: 2.8rem;

    font-weight: 600;

    color: var(--gray-4);
  }
`;

export const AppbarInnerWrap = styled.div<InnerWrapStyle>`
  position: fixed;
  padding: 1rem 2rem;
  min-height: 5rem;
  width: ${({ width }) => width && `${width}px`};
  border-bottom: 1px solid var(--gray-2);
  background-color: white;

  display: flex;
  align-items: center;
  justify-content: space-between;

  div:last-child {
    color: var(--primary);
    cursor: pointer;
  }
`;

export const AppbarTitle = styled.div`
  display: flex;
  align-items: ceter;

  div {
    cursor: pointer;
  }
`;
