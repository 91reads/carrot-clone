import type { NextPage } from 'next';
import Image from 'next/image';
import useSWR from 'swr';
import styled from 'styled-components';
import { useRouter } from 'next/router';
// components
import Appbar from '@components/Layout/Appbar';
import Tabbar from '@components/Layout/Tabbar';
import Loading from '@components/Loading/Loading';
// api
import { getUserDetail, getUserReview } from 'src/api/user';
// assets
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArticleIcon from '@mui/icons-material/Article';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteIcon from '@mui/icons-material/Favorite';
// styles
import {
  ProfileContainer,
  ProfileBox,
  ProfileBoxContent,
  ProfileBoxTitle,
  ProfileBoxEdit,
  ProfileHistoryBox,
  ProfileImage,
} from 'assets/pages/profile/index_styles';

const Profile: NextPage = () => {
  const router = useRouter();
  const user_data = useSWR(`/api/users/me`, getUserDetail);
  const user_review = useSWR('/api/reviews', getUserReview);

  if (user_data.error || user_review.error) return <div>...에러</div>;
  if (!user_data.data && !user_review.data) return <Loading />;

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
      link: '/profile/history/favs',
      content: '관심 내역',
    },
  ];

  return (
    <>
      <Appbar title="나의 당근" backButtonDisable />
      <ProfileContainer>
        <ProfileBox>
          <ProfileBoxContent>
            <ProfileImage>
              <Image
                src={
                  user_data.data?.avatar
                    ? `${process.env.NEXT_PUBLIC_CF_IMAGE}/${user_data.data?.avatar}/avatar`
                    : `${process.env.NEXT_PUBLIC_CF_IMAGE}/74514a95-ce9a-471d-b000-b927ff295500/avatar`
                }
                width={20}
                height={20}
                alt=""
                layout="responsive"
                style={{ borderRadius: '50%' }}
              />
            </ProfileImage>
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
