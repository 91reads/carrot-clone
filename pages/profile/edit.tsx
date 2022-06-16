import type { NextPage } from "next";
import useUser from "@libs/client/useUser";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Image from 'next/image';
import Layout from "@components/Layout";
import Input from "@components/Input";
import Button from "@components/Button";
import useMutation from "@libs/client/useMutation";

interface EditProfileForm {
  email?: string;
  phone?: string;
  name?: string;
  avatar?: FileList;
  formErrors?: string;
}

interface EditProfileResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    watch,
    formState: { errors }
  } = useForm<EditProfileForm>();

  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
    if (user?.avatar) set_avatar_priview(user.avatar);
  }, [user, setValue]);

  const [editProfile, { data, loading }] = useMutation<EditProfileResponse>(`/api/users/me`);

  const onValid = async ({ email, phone, name, avatar }: EditProfileForm) => {
    if (loading) return;
    if (email === "" && phone === "" && name === "") {
      return setError("formErrors", {
        message: "Email OR Phone number are required. You need to choose one.",
      });
    }

    if (avatar && avatar.length > 0) {
      const { uploadURL } = await (await fetch(`/api/files`)).json()

      const form = new FormData();
      form.append("file", avatar[0], user?.id + "")
      const { result: { id } } = await (await fetch(uploadURL, {
        method: 'POST',
        body: form,
      })).json();
      editProfile({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      editProfile({ email, phone, name });
    }

  };

  useEffect(() => {
    if (data && !data.ok) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError])

  const avatar = watch("avatar");
  const [avatar_priveiw, set_avatar_priview] = useState("");

  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      set_avatar_priview(URL.createObjectURL(file));
    }
  }, [avatar])

  return (
    <Layout canGoBack title="Edit Profile">
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          {avatar_priveiw
            ? <Image src={`https://imagedelivery.net/PvvqDlv-2VYHUsYbyy-DlQ/${avatar_priveiw}/avatar`} className="w-14 h-14 rounded-full bg-slate-500" alt="" layout="fill"/>
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
          register={register("name")}
          required={false}
          label="Name"
          name="name"
          type="text"
        />
        <Input
          register={register("email")}
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
        <Button text={loading ? "Loading" : "Update profile"} />
      </form>
    </Layout>
  );
};

export default EditProfile;