import styled from 'styled-components';

interface MessageProps {
  message: string;
  mymessage: boolean;
  avatarUrl?: string;
}

interface MessageStyledProps {
  mymessage: boolean;
}

const MessageContainer = styled.div<MessageStyledProps>`
  display: flex;
  width: 100%;
  padding: 0.2rem 1rem;
  justify-content: ${({ mymessage }) => (mymessage ? 'end' : 'start')};
  p {
    display: flex;
    padding: 0.4rem 1rem;
    align-items: ${({ mymessage }) => (mymessage ? 'end' : 'start')};
    border-radius: var(--br-6);
    background-color: ${({ mymessage }) => (mymessage ? 'var(--primary)' : 'var(--gray-1)')};
    color: ${({ mymessage }) => (mymessage ? 'white' : 'var(--gray-4)')};
    font-size: 1.4rem;
    line-height: 2.2rem;
  }
`;

export default function Message({ message, mymessage }: MessageProps) {
  return (
    <MessageContainer mymessage={mymessage}>
      <div />
      <p>{message}</p>
    </MessageContainer>
  );
}
