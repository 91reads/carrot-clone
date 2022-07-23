import type { NextPage } from 'next';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import useSWR from 'swr';
import { useRouter } from 'next/router';
// components
import Appbar from '@components/Layout/Appbar/Appbar';
import Loading from '@components/Loading/Loading';
// api
import { getUserDetail, updateUser } from 'src/api/user';
import { getCFToken } from 'src/api/cloudflare';
// assets
import CameraAltIcon from '@mui/icons-material/CameraAlt';
// styles
import {
  ProfileEditContainer,
  FormContainer,
  DetailProfileImage,
  DetailProfileImageIcon,
} from 'assets/pages/profile/edit_styles';

interface EditProfileForm {
  name: string;
  email: string;
  phone?: string;
  avatar?: FileList;
  formErrors?: string;
}

const EditProfile: NextPage = () => {
  const router = useRouter();
  const user_data = useSWR('/api/users/me', getUserDetail);
  const { register, setValue, handleSubmit, watch } = useForm<EditProfileForm>();
  const [avatar_preview, set_avatar_preview] = useState('');
  const [error, set_error] = useState(false);
  const [loading, set_loading] = useState(false);
  const avatar = watch('avatar');
  
  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const triggerSubmit = () => {
    refSubmitButton?.current?.click();
  };

  // form 에 기존 값 넣어줌
  useEffect(() => {
    if (!user_data.data) return;
    setValue('name', user_data.data.name);
    setValue('email', user_data.data.email);
    setValue('phone', user_data.data.phone);
  }, [setValue, user_data]);

  // 이미지 업로드 시 미리보기
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      set_avatar_preview(URL.createObjectURL(file));
    }
  }, [avatar]);

  if (user_data.error) return <div>...에러</div>;
  if (!user_data.data) return <Loading />;

  // 프로필 업데이트
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
