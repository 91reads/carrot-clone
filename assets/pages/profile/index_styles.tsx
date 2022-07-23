import styled from 'styled-components';

export const ProfileContainer = styled.div`
  padding-top: 5rem;
`;
export const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
`;
export const ProfileBoxContent = styled.div`
  display: flex;
  align-items: center;
`;
export const ProfileBoxTitle = styled.div`
  padding-left: 2rem;
  font-size: 1.4rem;
  strong {
    font-weight: var(--weight-600);
    line-height: 2.8rem;
  }
  p {
    font-weight: var(--weight-400);
    color: var(--gray-3);
  }
`;
export const ProfileBoxEdit = styled.div`
  cursor: pointer;
`;

export const ProfileHistoryBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding-top: 2rem;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    span {
      display: flex;
      position: relative;
      width: 5rem;
      height: 5rem;
      background-color: rgba(255, 126, 53, 0.2);
      border-radius: 50%;
      strong {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        svg {
          color: var(--primary);
          font-size: 2.2rem;
        }
      }
    }
  }
  p {
    font-size: 1.4rem;
    line-height: 2.8rem;
  }
`;

export const ProfileImage = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;
