import FloatingButton from "src/components/FloattingButton";
import useSWR from 'swr';
// components
import Appbar from '@components/Layout/Appbar';
import Tabbar from '@components/Layout/Tabbar';
// api 
import { getPostList, PostStructureType } from 'src/api/community';
// assets
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useRouter } from 'next/router';
// styles
import {
  CommunityContainer,
  PostContainer,
  PostTitle,
  PostContent,
  PostInfo,
  PostInfoContent,
} from 'assets/pages/community/styles';

const Community = () => {
  const community_data = useSWR<Array<PostStructureType>>(`/api/posts`, getPostList);
  const router = useRouter();

  if (community_data.error) return <div>...error</div>;
  if (!community_data.data) return <div>...loading</div>;

  const onMoveRouter = (id: number) => {
    router.push(`/community/${id}`);
  };

  return (
    <>
      <Appbar title="동네생활" />
      <CommunityContainer>
        {community_data?.data?.map((post) => (
          <PostContainer key={post.id} onClick={() => onMoveRouter(post.id)}>
            <PostTitle>동네질문</PostTitle>
            <PostContent>
              <strong>Q. </strong>
              <p>{post.question}</p>
            </PostContent>
            <PostInfo>
              <div>
                <span>{post.user.name}</span>
                <p>18시간 전</p>
              </div>
              <PostInfoContent>
                <ChatIcon style={{ fontSize: '1.6rem', fill: 'black' }} />
                <p>궁금해요 {post._count.wondering}</p>
                <CheckCircleOutlineRoundedIcon style={{ fontSize: '1.6rem', fill: 'black' }} />
                <p>답변 {post._count.answers}</p>
              </PostInfoContent>
            </PostInfo>
          </PostContainer>
        ))}
        <FloatingButton href="/products/register" />
      </CommunityContainer>
      <Tabbar />
    </>
  );
};

export default Community;
