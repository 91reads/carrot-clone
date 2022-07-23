// lib
import { getPrevDate } from '@libs/format';
import { CommunityCardProps } from '@libs/type/community_type';
// assets
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
// styles
import {
  CommunityInnerWrap,
  CommunityTitle,
  CommunityContent,
  CommunityInfo,
  CommunityInfoContent,
} from './styles';

const CommunityCard = ({ question, updatedAt, user, _count, onClick }: CommunityCardProps) => {

  const _onClick = () => {
    if (!onClick) return;
    onClick();
  };

  return (
    <CommunityInnerWrap onClick={_onClick}>
      <CommunityTitle>동네질문</CommunityTitle>
      <CommunityContent>
        <strong>Q. </strong>
        <p>{question}</p>
      </CommunityContent>
      <CommunityInfo>
        <div>
          <span>{user.name}</span>
          <p>{getPrevDate(updatedAt)}</p>
        </div>
        <CommunityInfoContent>
          <ChatIcon style={{ fontSize: '1.6rem', fill: 'black' }} />
          <p>궁금해요 {_count.wondering}</p>
          <CheckCircleOutlineRoundedIcon style={{ fontSize: '1.6rem', fill: 'black' }} />
          <p>답변 {_count.answers}</p>
        </CommunityInfoContent>
      </CommunityInfo>
    </CommunityInnerWrap>
  );
};

export default CommunityCard;