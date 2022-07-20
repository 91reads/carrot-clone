import useSWR from 'swr';
import { useRouter } from 'next/router';
import Image from 'next/image';
// components
import Tabbar from '@components/Layout/Tabbar';
import Appbar from '@components/Layout/Appbar';
import Loading from '@components/Loading/Loading';
// api
import { getChatList } from 'src/api/chat';
// lib
import useUser from '@libs/client/useUser';
import { ChatStructureType } from '@libs/type/chat_type';
// styles
import { ChatContainer, ChatItemBox, ChatItemContent, ChatItemImage } from 'assets/pages/chat/list_styles';

const Chats = () => {
  const router = useRouter();
  const chat_data = useSWR<Array<ChatStructureType>>(`/api/chats`, getChatList);
  const my_id = useUser();

  const moveRouter = (chat_id: string, product_id: string, status: string, user_id: number) => {
    router.push({
      pathname: `/chats/${chat_id}`,
      query: {
        chat_id,
        product_id,
        status,
        user_id,
      },
    });
  };

  if (chat_data.error) return <div>...에러</div>;
  if (!chat_data.data) return <Loading />;

  return (
    <>
      <Appbar title="채팅" backButtonDisable={true} />
      <ChatContainer>
        {chat_data.data
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((chat_info, i) => (
            <ChatItemBox
              onClick={() => moveRouter(chat_info.id, chat_info.productId, chat_info.product.status, chat_info.user.id)}
              key={i}
            >
              <ChatItemImage>
                <Image
                  src={
                    chat_info.sellerId === my_id
                      ? `${process.env.NEXT_PUBLIC_CF_IMAGE}/${
                          chat_info.user.avatar || '74514a95-ce9a-471d-b000-b927ff295500'
                        }/avatar`
                      : `${process.env.NEXT_PUBLIC_CF_IMAGE}/${
                          chat_info.product.user.avatar || '74514a95-ce9a-471d-b000-b927ff295500'
                        }/avatar`
                  }
                  alt=""
                  layout="fill"
                  style={{ borderRadius: '50%' }}
                />
              </ChatItemImage>
              <ChatItemContent>
                <strong>{chat_info.sellerId === my_id ? chat_info.user.name : chat_info.product.user.name}</strong>
                <p>{chat_info.messages[chat_info.messages.length - 1]?.message}</p>
              </ChatItemContent>
              <ChatItemImage>
                <Image
                  src={
                    chat_info.product.image
                      ? `${process.env.NEXT_PUBLIC_CF_IMAGE}/${chat_info.product.image}/avatar`
                      : `${process.env.NEXT_PUBLIC_CF_IMAGE}/74514a95-ce9a-471d-b000-b927ff295500/avatar`
                  }
                  alt=""
                  layout="fill"
                  style={{ borderRadius: '50%' }}
                />
              </ChatItemImage>
            </ChatItemBox>
          ))}
      </ChatContainer>
      <Tabbar />
    </>
  );
};

export default Chats;
