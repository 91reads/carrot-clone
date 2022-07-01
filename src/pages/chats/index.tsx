import Layout from "src/components/Layout";
import useSWR from "swr";
import { getChatList } from "src/api/chat";
import { useRouter } from "next/router";

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
  messages: Array<MessageStructureType>
  productId: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    avatar?: string;
  }
  userId: number;
}

const Chats = () => {
  const router = useRouter();
  const chat_data = useSWR<Array<ChatStructureType>>(`/api/chats`, getChatList);

  const moveRouter = (chat_id: string, product_id: string) => {
    router.push({
      pathname: `/chats/${chat_id}`,
      query: {
        chat_id,
        product_id,
      }
    })
  }

  if (chat_data.error) return <div>...에러</div>
  if (!chat_data.data) return <div>...로딩중</div>

  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] ">
        {chat_data.data.map((chat_info, i) => (
          <div onClick={() => moveRouter(chat_info.id, chat_info.productId)} key={i}>
            <a className="flex px-4 cursor-pointer py-3 items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-slate-300" />
              <div>
                <p className="text-gray-700">{chat_info.user.name}</p>
                <p className="text-sm  text-gray-500">
                  {chat_info.messages[0]?.message}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;