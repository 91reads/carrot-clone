import FloatingButton from 'src/components/FloattingButton';
import useSWR from 'swr';
import { useRouter } from 'next/router';
// components
import Appbar from '@components/Layout/Appbar/Appbar';
import Tabbar from '@components/Layout/Tabbar/Tabbar';
import Loading from '@components/Loading/Loading';
import CommunityCard from '@components/Card/Community/CommunityCard';
// api
import { getPostList } from 'src/api/community';
// lib
import { PostStructureType } from '@libs/type/community_type';
// styles
import { CommunityContainer } from 'assets/pages/community/list_styles';

const Community = () => {
  const community_data = useSWR<Array<PostStructureType>>(`/api/posts`, getPostList);
  const router = useRouter();

  if (community_data.error) return <div>...error</div>;
  if (!community_data.data) return <Loading />;

  const onMoveRouter = (id: number) => {
    router.push(`/community/${id}`);
  };

  return (
    <>
      <Appbar title="동네생활" backButtonDisable={true} />
      <CommunityContainer>
        {community_data.data
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((post) => (
            <CommunityCard
              key={post.createdAt}
              question={post.question}
              user={post.user}
              _count={post._count}
              updatedAt={post.updatedAt}
              onClick={() => onMoveRouter(post.id)}
            />
          ))}
        <FloatingButton href="/community/register" />
      </CommunityContainer>
      <Tabbar />
    </>
  );
};

export default Community;
