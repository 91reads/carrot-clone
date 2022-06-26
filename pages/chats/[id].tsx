import Layout from "@components/Layout";
import Message from "@components/Message";
import { createMessage, getRoomMessage } from "@libs/front-api/message";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";

const ChatDetail = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm();
  const room_message_data = useSWR(router.query.id && `/api/chats/${router.query.id}/message`, router.query.id ? () => getRoomMessage(router.query.id as string) : null);

  if(room_message_data.error) return <div>에러</div>
  if(!room_message_data.data) return <div>로디중</div>

  const onCreateMessage = (data: any) => {
    if(!router.query.id || !router.query.product_id) return;

    createMessage(router.query.chat_id as string, router.query.product_id as string, data.message)
    .then(() => {
      alert('Success Sending Message');
      reset();
    })
    .catch((e) => {
      console.log('CREATE_ERROR:', e)
      alert('Failure Sending Message');
    })
  }

  return (
    <Layout canGoBack title="Steve">
      <div className="py-10 pb-16 px-4 space-y-4">
        <Message message="Hi how much are you selling them for?" />
        <Message message="I want ￦20,000" reversed />
        <Message message="미쳤어" />
        <form onSubmit={handleSubmit(onCreateMessage)} className="fixed py-2 bg-white  bottom-0 inset-x-0">
          <div className="flex relative max-w-md items-center  w-full mx-auto">
            <input
              type="text"
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <input {...register('message', { required: true })} type="text" style={{ width: "200px", height: "20px", border: '1px solid gray'}}/>
              <button 
                type="submit"
                className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                메시지전송
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;