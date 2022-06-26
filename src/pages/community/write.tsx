import Button from "src/components/Button";
import Layout from "src/components/Layout";
import TextArea from "src/components/Textarea";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import useCoords from "src/libs/client/useCoord";
import { createPost, PostRegisterType } from "src/api/community";

const Write = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<PostRegisterType>();

  const onVaild = (data: PostRegisterType) => {
    if (!latitude || !longitude) return;

    createPost({ ...data, latitude, longitude })
      .then(() => {
        alert('Create Post Success');
        router.push(`/community`)
      })
      .catch(() => {
        alert('Error');
      })
  }

  return (
    <Layout canGoBack title="Write Post">
      <form onSubmit={handleSubmit(onVaild)} className="p-4 space-y-4">
        <TextArea register={register('question', { required: true })} required placeholder="Ask a question!" />
        <Button text={"Submit"} />
      </form>
    </Layout>
  );
};

export default Write;