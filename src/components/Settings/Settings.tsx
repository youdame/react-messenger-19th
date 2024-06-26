import { useSelector } from 'react-redux';
import { RootState } from 'store';
import styled from 'styled-components';
import { flexCenter, flexColumn } from 'styles/CommonStyle';
import { ReactComponent as CameraIcon } from 'asset/icons/CameraIcon.svg';
import { ReactComponent as PencilIcon } from 'asset/icons/PencilIcon.svg';
import { ReactComponent as RightArrowIcon } from 'asset/icons/RightArrowIcon.svg';

export default function Settings() {
  const userInfo = useSelector((state: RootState) => state.chat.participants.me);
  const { profileImage, name, phoneNumber } = userInfo;

  return (
    <SettingWrapper>
      <UserInfo>
        <img src={profileImage} alt="프로필 이미지" />
        <div>
          <h2 className="name">{name}</h2>
          <p className="phone-number"> +82 {phoneNumber}</p>
        </div>
      </UserInfo>
      <SettingsBody>
        <ButtonContainer>
          <IconButton icon={<CameraIcon alt="카메라 아이콘" />} label="프로필 사진 변경" />
          <hr />
          <IconButton icon={<PencilIcon alt="연필 아이콘" />} label="사용자명 설정" />
        </ButtonContainer>
        <ButtonContainer>
          <IconButton icon={<Eclipse round color="green" />} label="디자이너 인스타그램" hasArrowIcon={true} />
          <hr />
          <IconButton icon={<Eclipse round color="green" />} label="개발자 깃허브 / 인스타그램" hasArrowIcon={true} />
        </ButtonContainer>
        <ButtonContainer>
          <IconButton icon={<Eclipse color="red02" />} label="내 스토리" hasArrowIcon={true} />
        </ButtonContainer>
        <ButtonContainer>
          <IconButton icon={<Eclipse color="blue01" />} label="저장한 메세지" hasArrowIcon={true} />
          <hr />
          <IconButton icon={<Eclipse color="green" />} label="최근 통화" hasArrowIcon={true} />
          <hr />
          <IconButton icon={<Eclipse color="yellow" />} label="기기" hasArrowIcon={true} />
        </ButtonContainer>
      </SettingsBody>
    </SettingWrapper>
  );
}

const SettingWrapper = styled.div`
  ${flexColumn}
  height: 68rem;
  gap: 2.5rem;
  padding: 2.8rem 1.6rem;
`;

const UserInfo = styled.div`
  flex-direction: column;
  ${flexCenter}
  gap:0.8rem;
  & img {
    width: 10rem;
    height: 10rem;
  }

  .name {
    color: var(--black);
    text-align: center;

    /* head/display */
    font-size: 2.6rem;
    font-weight: 600;
    line-height: 2rem; /* 76.923% */
    margin-bottom: 0.8rem;
  }

  .phone-number {
    color: var(--gray04);
    font-size: 1.8rem;
    line-height: 2rem; /* 111.111% */
  }
`;

const IconButton = ({ icon, label, hasArrowIcon }: { icon: JSX.Element; label: string; hasArrowIcon?: boolean }) => (
  <Button>
    {icon}
    {label}
    {hasArrowIcon && <RightArrowIcon className="arrow-icon" alt="오른쪽 화살표 아이콘" />}
  </Button>
);

const Button = styled.button`
  display: flex;
  height: 4rem;
  width: 100%;
  color: var(--black);
  font-size: 1.8rem;
  line-height: 2rem; /* 111.111% */
  gap: 1.4rem;
  align-items: center;

  .arrow-icon {
    margin-left: auto;
  }
`;

const Eclipse = styled.div<{ round?: boolean; color: string }>`
  width: 3rem;
  height: 3rem;
  background-color: var(--${({ color }) => color});
  border-radius: ${({ round }) => (round ? '100%' : '0.8rem')};
`;

const ButtonContainer = styled.div`
  ${flexColumn}
  gap: 0.6rem;
  width: 34.3rem;
  padding: 0.7rem 1.6rem;
  border-radius: 0.8rem;
  background-color: var(--white);
`;

const SettingsBody = styled.div`
  ${flexColumn}
  gap: 2.4rem;
  overflow: scroll;
`;
