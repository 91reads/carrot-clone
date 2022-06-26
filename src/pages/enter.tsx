import type { NextPage } from "next";
import { useState } from "react";
import Button from "src/components/Button";
import Input from "src/components/Input";
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { requestOTP, verifyOTP } from "src/api/auth";

interface EnterForm {
  email: string;
}
interface TokenForm {
  token: string;
}

const Enter: NextPage = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<EnterForm>();
  const { register: tokenRegister, handleSubmit: tokenHandleSubmit, setValue } = useForm<TokenForm>();

  const [token_valid, set_token_vaild] = useState(false);

  // 로그인 이메일 작성
  const onValid = (data: EnterForm) => {
    requestOTP(data)
      .then((data) => {
        set_token_vaild(true);
        setValue("token", data.payload)
        sessionStorage.setItem('userId', data.userId);
      })
      .catch((e) => {
        console.error(e);
      })
    return;
  };

  // 토큰 검증
  const onTokenValid = (data: TokenForm) => {
    verifyOTP(data)
      .then(() => {
        alert('Login Success')
        router.push('/')
      })
      .catch((e) => {
        console.error(e);
        alert('Login Failure')
      })
  };

  return (
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">Enter to Carrot</h3>
      <div className="mt-12">
        {token_valid ? <form onSubmit={tokenHandleSubmit(onTokenValid)} className="flex flex-col mt-8 space-y-4">
          <Input
            register={tokenRegister("token", {
              required: true,
            })}
            name="token"
            label="Confirmation token"
            type="number"
            required
          />
          <Button text={"Confirm Token"} />
        </form> : <>        <div className="flex flex-col items-center">
          <h5 className="text-sm text-gray-500 font-medium">Enter using:</h5>
        </div>
          <form onSubmit={handleSubmit(onValid)} className="flex flex-col mt-8 space-y-4">
            <Input
              register={register("email", {
                required: true,
              })}
              name="email"
              label="Email address"
              type="email"
              required
            />
            <Button text={"Get login link"} />
          </form></>}
      </div>
    </div>
  );
};
export default Enter;