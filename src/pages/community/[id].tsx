import useSWR, { mutate } from 'swr';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
// components
import Appbar from '@components/Layout/Appbar';
import Loading from '@components/Loading/Loading';
// api
import { AnswerStructureType, createAnswer, getPostDetail, updateWonder } from 'src/api/community';
// lib
import { getPrevDate } from '@libs/format';
// assets
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
// styles
import {
  CommunityContainer,
  CommunityContent,
  CommunityAnswerContainer,
  CommunityAnswerItem,
  CommunityForm,
  CommunityInfoContent,
  CommunityProfileContainer,
  CommunityTextArea,
  DetailProfileImage,
  AnswerProfileImage,
} from 'assets/pages/community/detail_styles';

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
  if (!post_data.data) return  <Loading />

  const onUpdateWonder = (id: string) => {
    if (!id) return;

    updateWonder(id)
      .then(() => {
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
      <CommunityContainer>
        <CommunityProfileContainer>
          <DetailProfileImage>
            <Image
              src={
                post_data.data.post.user.avatar
                  ? `${process.env.NEXT_PUBLIC_CF_IMAGE}/${post_data.data.post.user.avatar}/avatar`
                  : `${process.env.NEXT_PUBLIC_CF_IMAGE}/74514a95-ce9a-471d-b000-b927ff295500/avatar`
              }
              alt="사람들이 올린 프로필 이미지 동그란 모양"
              layout="fill"
              style={{ borderRadius: '50%' }}
            />
          </DetailProfileImage>
          <Link key={post_data.data?.post.user.id} passHref href={`/profile/${post_data.data?.post.user.id}`}>
            <div>
              <strong>{post_data.data?.post.user.name}</strong>
              <p>{getPrevDate(post_data.data.post.createdAt)}</p>
            </div>
          </Link>
        </CommunityProfileContainer>
        <CommunityContent>
          <p>{post_data.data?.post.question}</p>
        </CommunityContent>
        <CommunityInfoContent>
          <div onClick={() => onUpdateWonder(router.query.id as string)}>
            <ChatIcon style={{ fontSize: '1.6rem', fill: 'black' }} />
            <p>궁금해요 {post_data.data?.post._count.wondering}</p>
          </div>
          <div>
            <CheckCircleOutlineRoundedIcon style={{ fontSize: '1.6rem', fill: 'black' }} />
            <p>답변 {post_data.data?.post._count.answers}</p>
          </div>
        </CommunityInfoContent>
        <CommunityAnswerContainer>
          {post_data.data?.post.answers.map((answer: AnswerStructureType) => (
            <CommunityAnswerItem key={answer.id}>
              <AnswerProfileImage>
                <Image
                  src={
                    answer.user.avatar
                      ? `${process.env.NEXT_PUBLIC_CF_IMAGE}/${answer.user.avatar}/avatar`
                      : `${process.env.NEXT_PUBLIC_CF_IMAGE}/74514a95-ce9a-471d-b000-b927ff295500/avatar`
                  }
                  alt="사람들이 올린 프로필 이미지 동그란 모양"
                  layout="fill"
                  style={{ borderRadius: '50%' }}
                />
              </AnswerProfileImage>
              <div>
                <strong>{answer.user.name}</strong>
                <b>{getPrevDate(post_data.data.post.createdAt)}</b>
                <p>{answer.answer}</p>
              </div>
            </CommunityAnswerItem>
          ))}
        </CommunityAnswerContainer>
        <CommunityForm onSubmit={handleSubmit((data) => onCreateAnswer(router.query.id as string, data))}>
          <CommunityTextArea
            placeholder="Answer this question!"
            required
            {...register('answer', { required: true, minLength: 5 })}
          />
          <button type="submit">{'답변달기'}</button>
        </CommunityForm>
      </CommunityContainer>
    </>
  );
};

export default CommunityPostDetail;
