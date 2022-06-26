import Layout from "src/components/Layout";
import TextArea from "src/components/Textarea";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { Answer, User } from "@prisma/client";
import Link from "next/link";
import { cls } from "src/libs/server/utils";
import { useForm } from "react-hook-form";
import { AnswerStructureType, createAnswer, getPostDetail, updateWonder } from "src/api/community";

interface AnswerForm {
  answer: string;
}

const CommunityPostDetail = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const post_data = useSWR(router.query.id && `/api/posts/${router.query.id}`, router.query.id ? () => getPostDetail(router.query.id as string) : null);

  if (post_data.error) return <div>...error</div>;
  if (!post_data.data) return <div>...loading</div>;

  const onUpdateWonder = (id: string) => {
    if (!id) return;

    updateWonder(id)
      .then(() => {
        alert('Wonder Update Success')
        mutate(`/api/posts/${id}`)
      })
      .catch(() => {
        alert('Unknown Error')
      })
  }

  const onCreateAnswer = (id: string, data: { answer: string }) => {
    if (!id || !data) return;

    createAnswer(id, data.answer)
      .then(() => {
        alert('Answer Create Success')
        mutate(`/api/posts/${id}`)
        reset();
      })
      .catch(() => {
        alert('Unkown Error')
      })
  }

  return (
    <Layout canGoBack>
      <div>
        <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          동네질문
        </span>
        <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <Link key={post_data.data?.post.user.id} passHref href={`/profile/${post_data.data?.post.user.id}`}>
            <div>
              <p className="text-sm font-medium text-gray-700">{post_data.data?.post.user.name}</p>
              <p className="text-xs font-medium text-gray-500">
                View profile &rarr;
              </p>
            </div>
          </Link>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">Q.</span> {post_data.data?.post.question}
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <button
              onClick={() => onUpdateWonder(router.query.id as string)}
              className={cls(
                "flex space-x-2 items-center text-sm",
                post_data.data?.isWondering ? "text-teal-400" : '')}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {post_data.data?.post._count.wondering}</span>
            </button>
            <span className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {post_data.data?.post._count.answers}</span>
            </span>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {post_data.data?.post.answers.map((answer: AnswerStructureType) => <div key={answer.id} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-slate-200 rounded-full" />
            <div>
              <span className="text-sm block font-medium text-gray-700">
                {answer.user.name}
              </span>
              <span className="text-xs text-gray-500 block ">2시간 전</span>
              <p className="text-gray-700 mt-2">
                {answer.answer}
              </p>
            </div>
          </div>)}
        </div>
        <form
          className="px-4"
          onSubmit={handleSubmit((data) => onCreateAnswer(router.query.id as string, data))}
        >
          <TextArea
            name="description"
            placeholder="Answer this question!"
            required
            register={register('answer', { required: true, minLength: 5 })}
          />
          <button type="submit" className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none ">
            {'Reply'}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;