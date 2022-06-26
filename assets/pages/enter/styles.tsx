import styled from 'styled-components';

export const EnterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  width: 100%;
  transform: translateY(-10%);

  padding: 2rem;

  * {
    width: 100%;
  }

  form:nth-child(2) {
    margin-top: 1.4rem;

    p {
      font-size: 1.4rem;
      line-height: 3.6rem;

      color: var(--gray-3);
    }
  }
  `;

export const EnterTitle = styled.div`
    padding-top: 4rem;
  h3 {
    font-size: 2.8rem;
    line-height: 3.6rem;
    
    font-weight: 700;

    color: var(--gray-4);
  }
  p {
    font-size: 1.4rem;
    line-height: 3.6rem;

    color: var(--gray-3);
  }
`;

export const CustomInput = styled.input`
  width: 100%;
  margin-top: 1.6rem;
  padding: 1rem;
  border-radius: var(--br-6);

  border: 1px solid var(--gray-2);
  font-size: 1.8rem;
  line-height: 3rem;
`;