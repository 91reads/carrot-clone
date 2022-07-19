import styled from 'styled-components';

export const CommunityContainer = styled.div`
  padding-top: 5rem;
`;

export const CommunityInnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--gray-2);
  padding: 2rem;
  display: flex;
  justify-content: space-between;

  cursor: pointer;
`;

export const CommunityTitle = styled.div`
  font-size: 1.6rem;
  line-height: 3rem;
  font-weight: var(--weight-500);
`;

export const CommunityContent = styled.div`
  display: flex;
  font-size: 1.4rem;
  line-height: 2.8rem;

  strong {
    color: var(--primary);
    padding-right: 0.6rem;
  }
  p {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    max-height: 9rem;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
`;

export const CommunityInfo = styled.div`
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

export const CommunityInfoContent = styled.div`
  display: flex;
  align-items: center;

  p {
    padding: 0 0.4rem 0 0.4rem;
    font-size: 1.2rem;
  }
`;