import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import styled from 'styled-components';
// lib
import { getCFToken } from 'src/api/cloudflare';
import { createProduct } from 'src/api/product';
import { CustomInput } from 'assets/pages/enter/styles';
import Appbar from '@components/Layout/Appbar';

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  photo: string;
}

const RegisterContainer = styled.div`
  padding-top: 5rem;
`;

const RegisterForm = styled.form`
  padding: 2rem;

  label {
    font-size: 1.6rem;
  }
`;

const RegisterItemBox = styled.div`
  margin-bottom: 1rem;
`;

const RegisterImage = styled.div`
  width: 100%;
  padding-bottom: 2rem;
`;

const RegisterTextArea = styled.textarea`
  border-radius: var(--br-6);
  border: 1px solid var(--gray-2);
  width: 100%;
  height: 14rem;
  margin-top: 1.6rem;
  resize: none;
  font-size: 1.8rem;
  line-height: 3rem;
`;

const Register = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  const { mutate } = useSWRConfig();
  const refSubmitButton = useRef<HTMLButtonElement>(null);

  const triggerSubmit = () => {
    refSubmitButton?.current?.click();
  };

  const onCreateProduct = async ({ name, price, description }: UploadProductForm) => {
    if (photo && photo.length > 0) {
      const { uploadURL } = await getCFToken();

      const form = new FormData();
      form.append('file', photo[0], name);

      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: 'POST',
          body: form,
        })
      ).json();

      createProduct({ name, price, description, photoId: id })
        .then(() => {
          mutate(`/api/products`);
          router.push(`/`);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      createProduct({ name, price, description })
        .then(() => {
          mutate(`/api/products`);
          router.push(`/`);
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };

  const photo = watch('photo');
  const [photo_priview, set_photo_priview] = useState('');
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0] as any;
      set_photo_priview(URL.createObjectURL(file));
    }
  }, [photo]);

  return (
    <>
      <Appbar title="상품 등록" onClick={triggerSubmit} onClickTitle={"클릭"}/>
      <RegisterContainer>
        <RegisterForm onSubmit={handleSubmit(onCreateProduct)}>
          <RegisterImage>
            {photo_priview ? (
              <Image src={photo_priview} alt="" width={280} height={280} layout="responsive" />
            ) : (
              <label>
                <svg className="h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input {...register('photo')} hidden={true} type="file" />
              </label>
            )}
          </RegisterImage>
          <RegisterItemBox>
            <label htmlFor="name">상품명</label>
            <CustomInput {...register('name', { required: true })} required name="name" type="text" />
          </RegisterItemBox>
          <RegisterItemBox>
            <label htmlFor="price">가격</label>
            <CustomInput {...register('price', { required: true })} required name="price" type="number" />
          </RegisterItemBox>
          <RegisterItemBox>
            <label htmlFor="description">상품 설명</label>
            <RegisterTextArea {...register('description', { required: true })} required name="description" />
          </RegisterItemBox>
          <button ref={refSubmitButton} type="submit" hidden={true}/>
        </RegisterForm>
      </RegisterContainer>
    </>
  );
};

export default Register;
