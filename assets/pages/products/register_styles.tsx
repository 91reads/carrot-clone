import styled from 'styled-components';

export const RegisterContainer = styled.div`
  padding-top: 5rem;
`;

export const RegisterForm = styled.form`
  padding: 2rem;

  label {
    font-size: 1.6rem;
  }
`;

export const RegisterItemBox = styled.div`
  margin-bottom: 1rem;
`;

export const RegisterImage = styled.div`
  width: 100%;
  padding-bottom: 2rem;
`;

export const RegisterTextArea = styled.textarea`
  border-radius: var(--br-6);
  border: 1px solid var(--gray-2);
  width: 100%;
  height: 14rem;
  margin-top: 1.6rem;
  resize: none;
  font-size: 1.8rem;
  line-height: 3rem;
`;