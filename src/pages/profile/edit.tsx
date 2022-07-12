import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getUserDetail, updateUser } from 'src/api/user';
import useSWR from 'swr';
import styled from 'styled-components';
import Appbar from '@components/Layout/Appbar';
import { getCFToken } from 'src/api/cloudflare';
import Loading from '@components/Loading/Loading';

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
  padding: 2rem;
`;

const DetailProfileImage = styled.div`
  display: flex;
  align-items: center !important;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: green;
  position: relative;
`;

const EditProfile: NextPage = () => {
  const user_data = useSWR('/api/users/me', getUserDetail);
  const { register, setValue, handleSubmit, watch } = useForm<EditProfileForm>();
  const avatar = watch('avatar');
  const [avatar_preview, set_avatar_preview] = useState('');
  const [error, set_error] = useState(false);

  useEffect(() => {
    if (!user_data.data) return;
    setValue('name', user_data.data.name);
    setValue('email', user_data.data.email);
    setValue('phone', user_data.data.phone);
    // set_avatar_preview(user_data.data.avatar);
  }, [setValue, user_data]);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      set_avatar_preview(URL.createObjectURL(file));
    }
  }, [avatar]);

  if (user_data.error) return <div>...에러</div>;
  if (!user_data.data) return  <Loading />
  console.log(avatar);
  const onUpdateUser = async ({ email, phone, name, avatar }: EditProfileForm) => {
    console.log('진입');

    if (email === '' || name === '') {
      set_error(true);
      return;
    }

    console.log(email, phone, name, avatar);

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
          alert('Profile Update Success');
        })
        .catch(() => {
          alert('Profile Update Failure, Retry Update Please');
        });
    } else {
      updateUser({ email, phone, name })
        .then(() => {
          alert('Profile Update Success');
        })
        .catch(() => {
          alert('Profile Update Failure, Retry Update Please');
        });
    }
  };

  return (
    <>
      <Appbar title="프로필" />
      <ProfileEditContainer onSubmit={handleSubmit(onUpdateUser)}>
        <FormContainer>
          <div>
            <DetailProfileImage>
              {avatar_preview ? (
                <Image src={avatar_preview} width={280} height={280} layout="responsive" />
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_CF_IMAGE}/${user_data.data.avatar}/avatar`}
                  alt=""
                  width={280}
                  height={280}
                  layout="responsive"
                />
              )}
            </DetailProfileImage>

            <label htmlFor="picture">
              Change
              <input {...register('avatar')} id="picture" type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          <input {...register('name', { required: true })} required={false} name="name" type="text" />
          <input {...register('email', { required: true })} required={false} name="email" type="email" />
          {/* <input {...register('phone')} required={false} name="phone" type="text" /> */}
          {error && <span>확인</span>}
          <button type="submit">업데이트</button>
        </FormContainer>
      </ProfileEditContainer>
    </>
  );
};

export default EditProfile;
