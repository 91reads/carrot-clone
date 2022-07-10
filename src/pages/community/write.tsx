import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { createPost, PostRegisterType } from 'src/api/community';
import Appbar from '@components/Layout/Appbar';
import styled from 'styled-components';
import { useRef } from 'react';

const PostContainer = styled.form`
  margin-top: 5rem;
  height: 80%;
`;
const RegisterTextArea = styled.textarea`
  border-radius: var(--br-6);
  /* border: 1px solid var(--gray-2); */
  border: none;
  width: 100%;
  /* height: 14rem; */
  padding: 1rem;
  margin-top: 1.6rem;
  resize: none;
  font-size: 1.8rem;
  line-height: 3rem;
  height: 100%;
  outline-style: none;
`;

const Write = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<PostRegisterType>();
  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const triggerSubmit = () => {
    refSubmitButton?.current?.click();
  };

  const onCreatePost = (data: PostRegisterType) => {
    createPost({ ...data })
      .then(() => {
        alert('Create Post Success');
        router.push(`/community`);
      })
      .catch(() => {
        alert('Error');
      });
  };

  return (
    <>
      <Appbar title="동네생활 등록" onClick={triggerSubmit} onClickTitle={'저장'} />
      <PostContainer onSubmit={handleSubmit(onCreatePost)} className="p-4 space-y-4">
        <RegisterTextArea {...register('question', { required: true })} required placeholder="Ask a question!" />
        <button ref={refSubmitButton} type="submit" hidden={true} />
      </PostContainer>
    </>
  );
};

export default Write;
