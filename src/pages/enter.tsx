import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Image from 'next/image';
// components
import Button from 'src/components/Button';
// api
import { requestOTP, verifyOTP } from 'src/api/auth';
// assets
import Logo from 'public/logo.png';
// styles
import { EnterContainer, EnterTitle, CustomInput, EnterImage } from 'assets/pages/enter/styles';
import Loading from '@components/Loading/Loading';

interface EnterForm {
  email: string;
}
interface TokenForm {
  token: string;
}

const Enter = () => {
  const router = useRouter();

  const { register, handleSubmit, watch } = useForm<EnterForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit, setValue } = useForm<TokenForm>();

  const [token_valid, set_token_vaild] = useState(false);
  const [active_color, set_active_color] = useState(false);
  const [loading, set_loading] = useState(false);

  const watch_email = watch('email');

  useEffect(() => {
    if (!watch_email) return;

    if (watch_email.includes('com')) set_active_color(true);
    else set_active_color(false);
  }, [watch_email]);

  // 로그인 이메일 작성
  const onValid = (data: EnterForm) => {
    if (token_valid || !active_color) return;
    set_loading(true);

    requestOTP(data)
      .then((data) => {
        set_token_vaild(true);
        set_loading(false);
        setValue('token', data.payload);
        sessionStorage.setItem('userId', data.userId);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // 토큰 검증
  const onTokenValid = (data: TokenForm) => {
    verifyOTP(data)
      .then(() => {
        alert('Login Success');
        router.push('/');
      })
      .catch((e) => {
        console.error(e);
        alert('Login Failure');
      });
  };

  return (
    <EnterContainer>
      <EnterImage>
        <Image src={Logo} width="140" height="146" alt="" />
      </EnterImage>
      <EnterTitle>
        <h3>안녕하세요!</h3>
        <h3>이메일을 입력해 주세요.</h3>
        <p>이메일 번호는 안전하게 보관되며 이웃들에게 공개되지 않아요.</p>
      </EnterTitle>
      <div>
        {/* 이메일 입력 폼 */}
        <form onSubmit={handleSubmit(onValid)}>
          <CustomInput {...register('email', { required: true })} type="email" />
          {loading ? (
            <Loading />
          ) : (
            <Button
              content={token_valid ? '인증번호 확인중' : '인증번호 받기'}
              marginTop={1}
              active={active_color}
              activeColor={token_valid ? 'var(--gray-2)' : 'var(--gray-4)'}
              normalColor={'var(--gray-2)'}
              disabled={token_valid}
            />
          )}
        </form>

        {/* 토큰 검증 폼 */}
        {token_valid && (
          <form onSubmit={tokenHandleSubmit(onTokenValid)}>
            <CustomInput {...tokenRegister('token', { required: true })} type="text" />
            <p>어떤 경우에도 타인에게 공유하지 마세요!</p>
            <Button
              content={'인증번호 확인'}
              marginTop={1}
              normalColor={'white'}
              backgroundColor={'var(--primary)'}
              borderDisabled={true}
            />
          </form>
        )}
      </div>
    </EnterContainer>
  );
};
export default Enter;
