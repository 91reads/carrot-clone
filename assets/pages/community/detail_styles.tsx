import styled from 'styled-components';

export const CommunityContainer = styled.div`
  padding-top: 5rem;
`;

export const CommunityAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  line-height: 2.8rem;
`;

export const CommunityAnswerItem = styled.div`
  display: flex;
  font-size: 1.4rem;
  padding: 1rem 2rem;
  div {
    padding-left: 0.6rem;
  }
  b {
    padding-left: 0.6rem;
    font-size: 1rem;
    color: var(--gray-2);
  }
`;

export const CommunityContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  font-size: 1.4rem;
  line-height: 2.8rem;
`;

export const CommunityProfileContainer = styled.div`
  display: flex;
  padding: 2rem;
  border-bottom: 1px solid var(--gray-1);
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 1rem;
    font-size: 1.6rem;
    p {
      font-size: 1.2rem;
      line-height: 2rem;
      color: var(--gray-2);
    }
  }
`;

export const CommunityInfoContent = styled.div`
  display: flex;
  padding: 1rem 2rem;
  border-top: 1px solid var(--gray-1);
  border-bottom: 1px solid var(--gray-1);
  div:first-child {
    cursor: pointer;
  }
  div {
    display: flex;
    align-items: center;
    p {
      padding: 0 0.4rem 0 0.4rem;
      font-size: 1.2rem;
    }
  }
`;

export const CommunityForm = styled.form`
  padding: 0 2rem;

  button {
    border: none;
    width: 100%;
    margin-top: 0.4rem;
    padding: 1.4rem;
    font-size: 1.4rem;
    background-color: var(--primary);
    color: white;
    border-radius: var(--br-12);
  }
`;

export const CommunityTextArea = styled.textarea`
  border-radius: var(--br-12);
  border: 1px solid var(--gray-2);
  width: 100%;
  height: 14rem;
  margin-top: 1.6rem;
  resize: none;
  padding-left: 1rem;
  font-size: 1.4rem;
  line-height: 3rem;
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

export const AnswerProfileImage = styled.div`
  display: flex;
  align-items: center !important;
  justify-content: center;
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 50%;
  background-color: green;
  position: relative;
`;
