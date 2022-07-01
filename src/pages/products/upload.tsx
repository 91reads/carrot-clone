import { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
// components
import Button from 'src/components/Button';
import Input from 'src/components/Input';
import Layout from 'src/components/Layout';
import TextArea from 'src/components/Textarea';
// lib
import { useRouter } from 'next/router';
import { getCFToken } from 'src/api/cloudflare';
import { createProduct } from 'src/api/product';
import { useSWRConfig } from 'swr';

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  photo: string;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  const { mutate } = useSWRConfig();

  const onVaild = async ({ name, price, description }: UploadProductForm) => {
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
          router.push(`/`);
          mutate(`/api/products`);
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
    <Layout canGoBack title="Upload Product">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onVaild)}>
        <div>
          {photo_priview ? (
            <Image
              src={photo_priview}
              className="w-full text-gray-600  h-46 rounded-md"
              alt=""
              width={100}
              height={100}
            />
          ) : (
            <label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
              <svg className="h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <input {...register('photo')} className="hidden" type="file" />
            </label>
          )}
        </div>
        <Input register={register('name', { required: true })} required label="Name" name="name" type="text" />
        <Input
          register={register('price', { required: true })}
          required
          label="Price"
          name="price"
          type="number"
          kind="price"
        />
        <TextArea
          register={register('description', { required: true })}
          required
          name="description"
          label="Description"
        />
        <Button content={'Upload Item'} />
      </form>
    </Layout>
  );
};

export default Upload;
