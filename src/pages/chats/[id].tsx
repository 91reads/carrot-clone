import Message from 'src/components/Message';
import { createMessage, getRoomMessage } from 'src/api/message';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import useSWR from 'swr';
import Appbar from '@components/Layout/Appbar';
import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import { MessageStructure } from '@libs/type/message_type';
import { ChatStructure } from '@libs/type/chat_type';
import Loading from '@components/Loading/Loading';

const ChatDetailContainer = styled.div`
  padding-top: 5rem;
`;

const ChatButtonBox = styled.div`
  position: absolute;
  display: flex;
  bottom: 0;
  background-color: var(--gray-1);
  width: 100%;
  height: 6.6rem;

  input {
    margin: 1rem;
    width: 100%;
    padding: 2rem 2rem 2rem 1.2rem;
    border-radius: var(--br-12);
    background-color: white;
    border: none;
  }
  button {
    svg {
      font-size: 2rem;
      color: var(--gray-2);
    }
    svg:hover {
      color: var(--gray-4);
      cursor: pointer;
    }
    border: none;
    border-radius: var(--br-12);
    background-color: transparent;
    margin: 1rem 1rem 1rem 0;
  }
`;

const ChatDetail = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const room_message_data = useSWR<Array<ChatStructure>>(
    router.query.product_id && `/api/chats/${router.query.product_id}/message`,
    router.query.product_id ? () => getRoomMessage(router.query.product_id as string) : null,
  );

  if (room_message_data.error) return <div>에러</div>;
  if (!room_message_data.data) return  <Loading />

  const my_id = room_message_data.data[0].userId;
  const onCreateMessage = (data: any) => {
    if (!router.query.id || !router.query.product_id) return;

    createMessage(router.query.chat_id as string, router.query.product_id as string, data.message)
      .then(() => {
        alert('Success Sending Message');
        reset();
      })
      .catch((e) => {
        console.log('CREATE_ERROR:', e);
        alert('Failure Sending Message');
      });
  };

  return (
    <>
      <Appbar title={''} />
      <ChatDetailContainer>
        {room_message_data.data[0].messages.map((v: MessageStructure) => {
          return <Message key={v.user.id} message={v.message} mymessage={v.user.id === my_id} />;
        })}
        <form onSubmit={handleSubmit(onCreateMessage)}>
          <ChatButtonBox>
            <input {...register('message', { required: true })} type="text" />
            <button type="submit">
              <SendIcon />
            </button>
          </ChatButtonBox>
        </form>
      </ChatDetailContainer>
    </>
  );
};

export default ChatDetail;
