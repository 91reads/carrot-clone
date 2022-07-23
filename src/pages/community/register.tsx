import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
// components
import Appbar from '@components/Layout/Appbar/Appbar';
// api
import { createPost } from 'src/api/community';
// lib
import { PostRegisterType } from '@libs/type/community_type';
// styles
import {
  RegisterContainer,
  RegisterTextArea
} from 'assets/pages/community/register_styles';

const Write = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<PostRegisterType>();
  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const triggerSubmit = () => {
    refSubmitButton?.current?.click();
  };

  // 동네생활 글 등록
  const onRegisterPost = (data: PostRegisterType) => {
    createPost({ ...data })
      .then(() => {
        router.push(`/community/list`);
      })
      .catch(() => {
        alert('Error');
      });
  };

  return (
    <>
      <Appbar title="동네생활 등록" onClick={triggerSubmit} onClickTitle={'저장'} />
      <RegisterContainer onSubmit={handleSubmit(onRegisterPost)}>
        <RegisterTextArea {...register('question', { required: true })} required placeholder="Ask a question!" />
        <button ref={refSubmitButton} type="submit" hidden={true} />
      </RegisterContainer>
    </>
  );
};

export default Write;
