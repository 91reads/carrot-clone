import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { getUserDetail, updateUser } from 'src/api/user';
import useSWR from 'swr';
import styled from 'styled-components';
import Appbar from '@components/Layout/Appbar';
import { getCFToken } from 'src/api/cloudflare';
import Loading from '@components/Loading/Loading';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useRouter } from 'next/router';

interface EditProfileForm {
  name: string;
  email: string;
  phone?: string;
  avatar?: FileList;
  formErrors?: string;
}

const ProfileEditContainer = styled.form`
  margin-top: 5rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;

  div {
    width: 100%;
    margin-top: 1rem;
    font-size: 1.4rem;
    font-weight: var(--weight-600);
    input {
      width: 100%;
      margin-top: 1rem;
      padding: 0.6rem 1rem;
      border-radius: var(--br-6);

      border: 1px solid var(--gray-2);
      font-size: 1.8rem;
      line-height: 3rem;
    }
  }
`;

const DetailProfileImage = styled.label`
  display: flex;
  position: relative;
  align-items: center !important;
  justify-content: center;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  position: relative;
  border: 1px solid #e8e8e8;
`;

const DetailProfileImageIcon = styled.div`
  position: relative;
  right: -3.8rem;
  bottom: -3rem;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 2.8rem;
  min-width: 2.8rem;
  max-height: 2.8rem;
  min-height: 2.8rem;
  border: 1px solid #e8e8e8;
  border-radius: 50%;
`;

const EditProfile: NextPage = () => {
  const router = useRouter();
  const user_data = useSWR('/api/users/me', getUserDetail);
  const { register, setValue, handleSubmit, watch } = useForm<EditProfileForm>();
  const avatar = watch('avatar');
  const [avatar_preview, set_avatar_preview] = useState('');
  const [error, set_error] = useState(false);
  const [loading, set_loading] = useState(false);

  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const triggerSubmit = () => {
    refSubmitButton?.current?.click();
  };

  useEffect(() => {
    if (!user_data.data) return;
    setValue('name', user_data.data.name);
    setValue('email', user_data.data.email);
    setValue('phone', user_data.data.phone);
  }, [setValue, user_data]);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      set_avatar_preview(URL.createObjectURL(file));
    }
  }, [avatar]);

  if (user_data.error) return <div>...에러</div>;
  if (!user_data.data) return <Loading />;

  const onUpdateUser = async ({ email, phone, name, avatar }: EditProfileForm) => {
    set_loading(true);
    if (email === '' || name === '') {
      set_error(true);
      return;
    }

    if (avatar && avatar.length > 0) {
      const { uploadURL } = await getCFToken();

      const form = new FormData();
      form.append('file', avatar[0], user_data.data?.id + '');
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();

      updateUser({
        name,
        email,
        phone,
        avatarId: id,
      })
        .then(() => {
          set_loading(false);
          router.back();
        })
        .catch(() => {
          alert('Profile Update Failure, Retry Update Please');
        });
      } else {
        updateUser({ email, phone, name })
        .then(() => {
          set_loading(false);
        })
        .catch(() => {
          alert('Profile Update Failure, Retry Update Please');
        });
    }
  };

  return (
    <>
      <Appbar title="프로필 수정" onClick={loading ? () => {undefined} : triggerSubmit} onClickTitle={loading ? '저장중' : '완료'} />
      {loading ? (
        <Loading />
      ) : (
        <ProfileEditContainer onSubmit={handleSubmit(onUpdateUser)}>
          <FormContainer>
            <DetailProfileImage htmlFor="picture">
              {avatar_preview.length > 1 ? (
                <Image src={avatar_preview} width={280} height={280} layout="fill" style={{ borderRadius: '50%' }} alt=""/>
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_CF_IMAGE}/${user_data.data.avatar}/avatar`}
                  alt=""
                  width={280}
                  height={280}
                  layout="fill"
                  style={{ borderRadius: '50%' }}
                />
              )}
              <DetailProfileImageIcon>
                <CameraAltIcon />
              </DetailProfileImageIcon>
            </DetailProfileImage>
            <input {...register('avatar')} id="picture" type="file" hidden={true} accept="image/*" />
            <div>
              <label htmlFor="name">닉네임</label>
              <input {...register('name', { required: true })} required={false} name="name" type="text" />
            </div>
            <div>
              <label htmlFor="email">이메일</label>
              <input {...register('email', { required: true })} required={false} name="email" type="email" />
            </div>

            {error && <span>확인</span>}
            <button ref={refSubmitButton} type="submit" hidden={true}>
              업데이트
            </button>
          </FormContainer>
        </ProfileEditContainer>
      )}
    </>
  );
};

export default EditProfile;
