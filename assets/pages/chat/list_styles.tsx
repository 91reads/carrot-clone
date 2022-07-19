import styled from "styled-components";

export const ChatContainer = styled.div`
  padding-top: 5rem;
`;

export const ChatItemBox = styled.div`
  display: flex;
  padding: 2rem;
  border-bottom: 1px solid var(--gray-1);
  cursor: pointer;
`;

export const ChatItemImage = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
`;

export const ChatItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 1rem;

  font-size: 1.4rem;
  strong {
    font-weight: var(--weight-500);
  }
  p {
    font-weight: var(--weight-400);
    line-height: 2.2rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 28rem;
  }
`;