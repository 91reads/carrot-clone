import FloatingButton from 'src/components/FloattingButton';
import useSWR from 'swr';
// components
import Appbar from '@components/Layout/Appbar';
import Tabbar from '@components/Layout/Tabbar';
import Loading from '@components/Loading/Loading';
// api
import { getPostList, PostStructureType } from 'src/api/community';
// lib
import { getPrevDate } from '@libs/format';
// assets
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { useRouter } from 'next/router';
// styles
import {
  CommunityContainer,
  CommunityInnerWrap,
  CommunityTitle,
  CommunityContent,
  CommunityInfo,
  CommunityInfoContent,
} from 'assets/pages/community/list_styles';

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
        {community_data?.data
          ?.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
          .map((post) => (
            <CommunityInnerWrap key={post.id} onClick={() => onMoveRouter(post.id)}>
              <CommunityTitle>동네질문</CommunityTitle>
              <CommunityContent>
                <strong>Q. </strong>
                <p>{post.question}</p>
              </CommunityContent>
              <CommunityInfo>
                <div>
                  <span>{post.user.name}</span>
                  <p>{getPrevDate(post.updatedAt)}</p>
                </div>
                <CommunityInfoContent>
                  <ChatIcon style={{ fontSize: '1.6rem', fill: 'black' }} />
                  <p>궁금해요 {post._count.wondering}</p>
                  <CheckCircleOutlineRoundedIcon style={{ fontSize: '1.6rem', fill: 'black' }} />
                  <p>답변 {post._count.answers}</p>
                </CommunityInfoContent>
              </CommunityInfo>
            </CommunityInnerWrap>
          ))}
        <FloatingButton href="/community/register" />
      </CommunityContainer>
      <Tabbar />
    </>
  );
};

export default Community;
