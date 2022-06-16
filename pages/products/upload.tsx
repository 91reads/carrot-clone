import type { NextPage } from "next";
import Image from "next/image";
import Button from "@components/Button";
import Input from "@components/Input";
import Layout from "@components/Layout";
import TextArea from "@components/Textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  photo: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<UploadProductForm>();
  const [uploadProduct, { loading, data }] = useMutation<UploadProductMutation>("/api/products");

  const onVaild = async ({ name, price, description }: UploadProductForm) => {
    if (loading) return;
    if (photo && photo.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", photo[0], name);
      const { result: { id } } = await (await fetch(uploadURL, {
        method: "POST",
        body: form,
      })).json();

      uploadProduct({ name, price, description, photoId: id });
    } else {
      uploadProduct({ name, price, description });
    }
  }

  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router])

  const photo = watch("photo");
  const [photo_priview, set_photo_priview] = useState("");
  useEffect(() => {
    if (photo && photo.length > 0) {
      const file = photo[0] as any;
      set_photo_priview(URL.createObjectURL(file))
    }
  }, [photo]);

  return (
    <Layout canGoBack title="Upload Product">
      <form className="p-4 space-y-4" onSubmit={handleSubmit(onVaild)}>
        <div>
          {
            photo_priview
              ? (<Image src={photo_priview} className="w-full text-gray-600  h-46 rounded-md" alt="" layout="fill" />)
              : (<label className="w-full cursor-pointer text-gray-600 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md">
                <svg
                  className="h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  {...register("photo")}
                  className="hidden"
                  type="file"
                />
              </label>)
          }
        </div>
        <Input register={register("name", { required: true })} required label="Name" name="name" type="text" />
        <Input register={register("price", { required: true })}
          required
          label="Price"
          name="price"
          type="number"
          kind="price"
        />
        <TextArea register={register("description", { required: true })} required name="description" label="Description" />
        <Button text={loading ? 'loading...' : 'Upload Item'} />
      </form>
    </Layout>
  );
};

export default Upload;