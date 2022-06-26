import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "src/components/Layout";
import Input from "src/components/Input";
import Button from "src/components/Button";
import { getUserDetail, updateUser } from "src/api/user";
import useSWR from "swr";

interface EditProfileForm {
  name: string;
  email: string;
  phone?: string;
  avatar?: FileList;
  formErrors?: string;
}

const EditProfile: NextPage = () => {
  const user_data = useSWR('/api/users/me', getUserDetail);
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<EditProfileForm>();
  const avatar = watch("avatar");
  const [avatar_priveiw, set_avatar_priview] = useState("");

  useEffect(() => {
    if (!user_data.data) return;
    setValue("name", user_data.data.name);
    setValue("email", user_data.data.email);
    setValue("phone", user_data.data.phone);
    set_avatar_priview(user_data.data.avatar);
  }, [setValue, user_data.data]);

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      set_avatar_priview(URL.createObjectURL(file));
    }
  }, [avatar])

  if (user_data.error) return <div>...에러</div>
  if (!user_data.data) return <div>...로딩중</div>

  const onUpdateUser = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });
    }

    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json()

      const form = new FormData();
      form.append("file", avatar[0], user_data.data?.id + "")
      const { result: { id } } = await (await fetch(uploadURL, {
        method: 'POST',
        body: form,
      })).json();

      updateUser({
        name,
        email,
        phone,
        avatarId: id,
      })
        .then(() => {
          alert('Profile Update Success');
        }).catch(() => {
          alert('Profile Update Failure, Retry Update Please')
        })
    } else {
      updateUser({ email, phone, name });
    }

  };

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onUpdateUser)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatar_priveiw
            ? <Image src={`https://imagedelivery.net/PvvqDlv-2VYHUsYbyy-DlQ/${avatar_priveiw}/avatar`} className="w-14 h-14 rounded-full bg-slate-500" alt="" layout="fill" />
            : <div className="w-14 h-14 rounded-full bg-slate-500" />
          }
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border hover:bg-gray-50 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name", { required: true })}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email", { required: true })}
          required={false}
          label="Email address"
          name="email"
          type="email"
        />
        <Input
          register={register("phone")}
          required={false}
          label="Phone number"
          name="phone"
          type="text"
          kind="phone"
        />
        {errors.formErrors ? (
          <span className="my-2 text-red-500 font-medium text-center block">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button text={"Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;