import styled from 'styled-components';
import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
// api
import { AnswerStructureType, createAnswer, getPostDetail, updateWonder } from 'src/api/community';
// components
import Appbar from '@components/Layout/Appbar';
// assets
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
// styles

const RegisterContainer = styled.div`
  padding-top: 5rem;
`;

const RegisterAnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.4rem;
  line-height: 2.8rem;
`;

const RegisterAnswerItem = styled.div`
  display: flex;
  font-size: 1.2rem;
  padding: 1rem 2rem;
  b {
    padding-left: 0.6rem;
    font-size: 1rem;
    color: var(--gray-2);
  }
`;

export const RegisterContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  font-size: 1.4rem;
  line-height: 2.8rem;
`;

const RegisterProfileContainer = styled.div`
  display: flex;
  padding: 2rem;
  border-bottom: 1px solid var(--gray-1);
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-left: 1rem;
    font-size: 1.6rem;
    p {
      font-size: 1.2rem;
      line-height: 2rem;
      color: var(--gray-2);
    }
  }
`;

export const RegisterInfoContent = styled.div`
  display: flex;
  padding: 1rem 2rem;
  border-top: 1px solid var(--gray-1);
  border-bottom: 1px solid var(--gray-1);
  div {
    display: flex;
    align-items: center;
    p {
      padding: 0 0.4rem 0 0.4rem;
      font-size: 1.2rem;
    }
  }
`;

const RegisterForm = styled.form`
  padding: 0 2rem;
`;

const RegisterTextArea = styled.textarea`
  border-radius: var(--br-6);
  border: 1px solid var(--gray-2);
  width: 100%;
  height: 14rem;
  margin-top: 1.6rem;
  resize: none;
  padding-left: 1rem;
  font-size: 1.4rem;
  line-height: 3rem;
`;

interface AnswerForm {
  answer: string;
}

const CommunityPostDetail = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<AnswerForm>();
  const post_data = useSWR(
    router.query.id && `/api/posts/${router.query.id}`,
    router.query.id ? () => getPostDetail(router.query.id as string) : null,
  );

  if (post_data.error) return <div>...error</div>;
  if (!post_data.data) return <div>...loading</div>;

  const onUpdateWonder = (id: string) => {
    if (!id) return;

    updateWonder(id)
      .then(() => {
        alert('Wonder Update Success');
        mutate(`/api/posts/${id}`);
      })
      .catch(() => {
        alert('Unknown Error');
      });
  };

  const onCreateAnswer = (id: string, data: { answer: string }) => {
    if (!id || !data) return;

    createAnswer(id, data.answer)
      .then(() => {
        alert('Answer Create Success');
        mutate(`/api/posts/${id}`);
        reset();
      })
      .catch(() => {
        alert('Unkown Error');
      });
  };

  return (
    <>
      <Appbar title="동네질문" />
      <RegisterContainer>
        <RegisterProfileContainer>
          {post_data.data.post.user.avatar ? (
            <div className="w-10 h-10 rounded-full bg-slate-300" />
          ) : (
            <AccountCircleRoundedIcon style={{ fontSize: '3.6rem', fill: 'black' }} />
          )}
          <Link key={post_data.data?.post.user.id} passHref href={`/profile/${post_data.data?.post.user.id}`}>
            <div>
              <strong className="text-sm font-medium text-gray-700">{post_data.data?.post.user.name}</strong>
              <p className="text-xs font-medium text-gray-500">2시간 전</p>
            </div>
          </Link>
        </RegisterProfileContainer>
        <RegisterContent>
          <p>{post_data.data?.post.question}</p>
        </RegisterContent>
        <RegisterInfoContent>
          <div onClick={() => onUpdateWonder(router.query.id as string)}>
            <ChatIcon style={{ fontSize: '1.6rem', fill: 'black' }} />
            <p>궁금해요 {post_data.data?.post._count.wondering}</p>
          </div>
          <div>
            <CheckCircleOutlineRoundedIcon style={{ fontSize: '1.6rem', fill: 'black' }} />
            <p>답변 {post_data.data?.post._count.answers}</p>
          </div>
        </RegisterInfoContent>
        <RegisterAnswerContainer>
          {post_data.data?.post.answers.map((answer: AnswerStructureType) => (
            <RegisterAnswerItem key={answer.id} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-slate-200 rounded-full" />
              <div>
                <strong className="text-sm block font-medium text-gray-700">{answer.user.name}</strong>
                <b className="text-xs text-gray-500 block ">2시간 전</b>
                <p className="text-gray-700 mt-2">{answer.answer}</p>
              </div>
            </RegisterAnswerItem>
          ))}
        </RegisterAnswerContainer>
        <RegisterForm onSubmit={handleSubmit((data) => onCreateAnswer(router.query.id as string, data))}>
          <RegisterTextArea
            placeholder="Answer this question!"
            required
            {...register('answer', { required: true, minLength: 5 })}
          />
          <button type="submit">{'답변달기'}</button>
        </RegisterForm>
      </RegisterContainer>
    </>
  );
};

export default CommunityPostDetail;
