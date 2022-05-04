import type { NextPage } from "next";
import Button from "@components/Button";
import Layout from "@components/Layout";
import TextArea from "@components/Textarea";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { useEffect } from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoord";

interface WriteForm {
  question: string;
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>('/api/posts');
  const onVaild = (data: WriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  }
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`)
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onVaild)} className="p-4 space-y-4">
        <TextArea register={register('question', { required: true })} required placeholder="Ask a question!" />
        <Button text={loading ? "...loading" : "Submit"} />
      </form>
    </Layout>
  );
};

export default Write;