import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
// components
import Appbar from '@components/Layout/Appbar';
// api
import { createPost, PostRegisterType } from 'src/api/community';
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

  const onRegisterPost = (data: PostRegisterType) => {
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
      <RegisterContainer onSubmit={handleSubmit(onRegisterPost)}>
        <RegisterTextArea {...register('question', { required: true })} required placeholder="Ask a question!" />
        <button ref={refSubmitButton} type="submit" hidden={true} />
      </RegisterContainer>
    </>
  );
};

export default Write;
