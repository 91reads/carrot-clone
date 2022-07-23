import styled from "styled-components";

export const ProfileEditContainer = styled.form`
  margin-top: 5rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  div {
    width: 100%;
    margin-top: 1rem;
    font-size: 1.4rem;
    font-weight: var(--weight-600);
    input {
      width: 100%;
      margin-top: 1rem;
      padding: 0.6rem 1rem;
      border-radius: var(--br-6);

      border: 1px solid var(--gray-2);
      font-size: 1.8rem;
      line-height: 3rem;
    }
  }
`;

export const DetailProfileImage = styled.label`
  display: flex;
  position: relative;
  align-items: center !important;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  position: relative;
  border: 1px solid #e8e8e8;
`;

export const DetailProfileImageIcon = styled.div`
  position: relative;
  right: -3.8rem;
  bottom: -3rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 2.8rem;
  min-width: 2.8rem;
  max-height: 2.8rem;
  min-height: 2.8rem;
  border: 1px solid #e8e8e8;
  border-radius: 50%;
`;