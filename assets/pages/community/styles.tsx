import styled from 'styled-components';

export const CommunityContainer = styled.div`
  padding-top: 5rem;
`;

export const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray-2);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
`;

export const PostTitle = styled.div`
  font-size: 1.6rem;
  line-height: 3rem;
  font-weight: var(--weight-500);
`;

export const PostContent = styled.div`
  display: flex;
  font-size: 1.4rem;
  line-height: 2.8rem;
`;

export const PostInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div:first-child {
    display: flex;
    font-size: 1.2rem;

    p {
      padding-left: 0.6rem;
      color: var(--gray-2);
    }
  }
`;

export const PostInfoContent = styled.div`
  display: flex;
  align-items: center;

  p {
    padding: 0 0.4rem 0 0.4rem;
    font-size: 1.2rem;
  }
`;