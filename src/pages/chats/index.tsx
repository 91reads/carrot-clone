import styled from 'styled-components';
import useSWR from 'swr';
import { getChatList } from 'src/api/chat';
import { useRouter } from 'next/router';
import Tabbar from '@components/Layout/Tabbar';
import Appbar from '@components/Layout/Appbar';

interface MessageStructureType {
  chatId: number;
  createdAt: string;
  id: number;
  message: string;
  productId: number;
  updatedAt: string;
  userId: number;
}
interface ChatStructureType {
  createdAt: string;
  id: string;
  messages: Array<MessageStructureType>;
  productId: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  };
  userId: number;
}

const ChatContainer = styled.div`
  padding-top: 5rem;
`;

const ChatItemBox = styled.div`
  display: flex;
  padding: 2rem;
  border-bottom: 1px solid var(--gray-1);
`;

const ChatItemImage = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: green;
`;

const ChatItemContent = styled.div`
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
  }
`;

const Chats = () => {
  const router = useRouter();
  const chat_data = useSWR<Array<ChatStructureType>>(`/api/chats`, getChatList);

  const moveRouter = (chat_id: string, product_id: string) => {
    router.push({
      pathname: `/chats/${chat_id}`,
      query: {
        chat_id,
        product_id,
      },
    });
  };

  if (chat_data.error) return <div>...에러</div>;
  if (!chat_data.data) return <div>...로딩중</div>;

  return (
    <>
      <Appbar title="채팅" backButtonDisable={true} />
      <ChatContainer className="divide-y-[1px] ">
        {chat_data.data.map((chat_info, i) => (
          <ChatItemBox onClick={() => moveRouter(chat_info.id, chat_info.productId)} key={i}>
            <ChatItemImage/>
            <ChatItemContent>
              <strong>{chat_info.user.name}</strong>
              <p>{chat_info.messages[0]?.message}</p>
            </ChatItemContent>
          </ChatItemBox>
        ))}
      </ChatContainer>
      <Tabbar />
    </>
  );
};

export default Chats;
