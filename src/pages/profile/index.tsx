import type { NextPage } from 'next';
import Image from 'next/image';
import useSWR from 'swr';
import { getUserDetail, getUserReview } from 'src/api/user';
import Appbar from '@components/Layout/Appbar';
import Tabbar from '@components/Layout/Tabbar';
import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useRouter } from 'next/router';

import ArticleIcon from '@mui/icons-material/Article';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Loading from '@components/Loading/Loading';

const ProfileContainer = styled.div`
  padding-top: 5rem;
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
`;
const ProfileBoxContent = styled.div`
  display: flex;
  align-items: center;
`;
const ProfileBoxTitle = styled.div`
  padding-left: 2rem;
  font-size: 1.4rem;
  strong {
    font-weight: var(--weight-600);
    line-height: 2.8rem;
  }
  p {
    font-weight: var(--weight-400);
    color: var(--gray-3);
  }
`;
const ProfileBoxEdit = styled.div`
  cursor: pointer;
`;

const ProfileHistoryBox = styled.div`
  display: flex;
  justify-content: space-around;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      display: flex;
      position: relative;
      width: 5rem;
      height: 5rem;
      background-color: rgba(255, 126, 53, 0.2);
      border-radius: 50%;
      strong {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        svg {
          color: var(--primary);
          font-size: 2.2rem;
        }
      }
    }
  }
  p {
    font-size: 1.4rem;
    line-height: 2.8rem;
  }
`;

const ProfileImage = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background-color: red;
`;

const Profile: NextPage = () => {
  const router = useRouter();
  const user_data = useSWR(`/api/users/me`, getUserDetail);
  const user_review = useSWR('/api/reviews', getUserReview);

  if (user_data.error || user_review.error) return <div>...에러</div>;
  if (!user_data.data && !user_review.data) return  <Loading />

  const HISTORY_TABLE = [
    {
      icon: <ArticleIcon />,
      link: '/profile/history/sold',
      content: '판매 내역',
    },
    {
      icon: <ShoppingBasketIcon />,
      link: '/profile/history/bought',
      content: '구매 내역',
    },
    {
      icon: <FavoriteIcon />,
      link: '/profile/history/loved',
      content: '관심 내역',
    },
  ];

  return (
    <>
      <Appbar title="나의 당근" backButtonDisable />
      <ProfileContainer>
        <ProfileBox>
          <ProfileBoxContent>
            {user_data.data?.avatar ? (
              <ProfileImage>
                <Image
                  src={`${process.env.NEXT_PUBLIC_CF_IMAGE}/${user_data.data?.avatar}/avatar`}
                  width={20}
                  height={20}
                  alt=""
                  layout="responsive"
                  style={{borderRadius: '50%'}}
                />
              </ProfileImage>
            ) : (
              <div style={{ width: '5rem', height: '5rem', backgroundColor: 'red', borderRadius: '50%' }} />
            )}
            <ProfileBoxTitle>
              <strong>{user_data.data?.name}</strong>
              <p># {user_data.data?.id}</p>
            </ProfileBoxTitle>
          </ProfileBoxContent>
          <ProfileBoxEdit onClick={() => router.push('/profile/edit')}>
            <ArrowForwardIosIcon style={{ fontSize: '2.2rem' }} />
          </ProfileBoxEdit>
        </ProfileBox>
        <ProfileHistoryBox>
          {HISTORY_TABLE.map((v) => {
            return (
              <div onClick={() => router.push(v.link)} key={v.link}>
                <span>
                  <strong>{v.icon}</strong>
                </span>
                <p>{v.content}</p>
              </div>
            );
          })}
        </ProfileHistoryBox>
      </ProfileContainer>
      <Tabbar />
    </>
  );
};

export default Profile;
