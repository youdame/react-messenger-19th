import styled from 'styled-components';
import { ReactComponent as LeftArrowIcon } from 'asset/icons/LeftArrowIcon.svg';
import { User } from 'types/ChatData';
import { getElapsedTime } from 'util/getElapsedTime';
import { useDispatch } from 'react-redux';
import { toggleParticipants } from 'store/chat';
import { AppDispatch } from 'store';
import { useNavigate } from 'react-router-dom';

interface ChatRoomHeaderProps {
  toggleParticipants: () => void;
  partner: User;
}

// 상대에 대한 정보가 담겨있는 채팅룸 상단
function ChatRoomHeader({ partner }: ChatRoomHeaderProps) {
  const dispatch: AppDispatch = useDispatch();

  const toggleParticipant = () => {
    dispatch(toggleParticipants());
  };

  const navigate = useNavigate();

  const handleGoBackButtonClick = () => {
    navigate(-1);
  };
  return (
    <ChatRoomHeaderWrapper>
      <button onClick={handleGoBackButtonClick}>
        <LeftArrowIcon className="arrow_icon" alt="뒤로 가기 아이콘" />
      </button>
      <UserDetailInfo>
        <h1 className="user_name">{partner?.name}</h1>
        <p className="last_access">
          마지막 접속 &nbsp;
          {partner?.lastAccess && getElapsedTime(partner?.lastAccess)}
        </p>
      </UserDetailInfo>
      <UserProfileImg src={partner?.profileImage} onClick={toggleParticipant} />
    </ChatRoomHeaderWrapper>
  );
}

export default ChatRoomHeader;

const ChatRoomHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  img {
    cursor: pointer;
  }
`;

const UserProfileImg = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 100%;
`;

const UserDetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;

  .arrow_icon {
    display: flex;
    align-items: flex-start;
  }
  .user_name {
    color: var(--black);
    text-align: center;
    font-size: 1.8rem;
    line-height: 2rem;
  }

  .last_access {
    color: var(--gray04);
    font-size: 1.3rem;
    letter-spacing: -0.01rem;
  }
`;
