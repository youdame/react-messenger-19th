import styled from 'styled-components';

import { ReactComponent as HeaderIcons } from '../asset/icons/HeaderIcons.svg';

import { flexCenter } from '../styles/CommonStyle';
function Header() {
  return (
    <HeaderWrapper>
      <p>9:41</p>
      <HeaderIcons alt="연결상태, 와이파이, 배터리 아이콘" />
    </HeaderWrapper>
  );
}

export default Header;

const CurrentTime = styled.p``;
const HeaderWrapper = styled.div`
  ${flexCenter}
  width: 100%;
  height: 4.4rem;
  padding: 1.2rem 1.8rem;
  justify-content: space-between;
`;
