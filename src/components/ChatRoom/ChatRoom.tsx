import styled from "styled-components";
import { flexCenter, flexColumn } from "styles/CommonStyle";
import { ReactComponent as LeftArrowIcon } from "asset/icons/LeftArrowIcon.svg";
import { ReactComponent as EmogiIcon } from "asset/icons/EmogiIcon.svg";
import { ReactComponent as FileInputIcon } from "asset/icons/FileInputIcon.svg";
import { ReactComponent as AudioIcon } from "asset/icons/AudioIcon.svg";
import { ChangeEvent, FormEvent, useState } from "react";
import { getCurrentTime } from "util/getCurrentTime";
import mockData from "data/chatData.json";
import { Chat } from "types/ChatData";

function ChatRoom() {
  const [inputValue, setInputValue] = useState("");

  // 대화창 하나만 구현하는 거니, 첫 번째 채팅 데이터만 가져옴
  const [chatData, setChatData] = useState<Chat>(mockData.chats[0]);

  const { users, messages } = chatData;

  const [currentPartnerId, setCurrentPartnerId] = useState(users[0].id);
  const [currentMyId, setCurrentMyId] = useState(users[1].id);

  const findUserById = (userId: string) => {
    return users.find((user) => user.id === userId);
  };

  const toggleCurrentMyId = () => {
    setCurrentMyId((prevId) =>
      prevId === users[0].id ? users[1].id : users[0].id
    );
    setCurrentPartnerId((prevId) =>
      prevId === users[0].id ? users[1].id : users[0].id
    );
  };

  const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }
    setChatData((prev: Chat) => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: 5,
          senderId: currentMyId,
          text: inputValue,
          createdAt: "2024-03-29T11:42:00",
        },
      ],
    }));

    setInputValue("");
  };

  return (
    <>
      <ChatRoomContainer>
        <ChatRoomHeader>
          <button>
            <LeftArrowIcon className="arrow_icon" alt="뒤로 가기 아이콘" />
          </button>
          <UserDetailInfo>
            <h1 className="user_name">
              {findUserById(currentPartnerId)?.name}
            </h1>
            <p className="last_access">마지막 접속 5분 전</p>
          </UserDetailInfo>
          <UserProfileImg
            src={findUserById(currentPartnerId)?.profileImage}
            onClick={toggleCurrentMyId}
          />
        </ChatRoomHeader>
        <ChatList>
          {messages.map((message) => (
            <ChatWrapper
              isMyMessage={message.senderId === currentMyId}
              key={message.id}
            >
              <div className="time_wrapper">
                <CurrentTime>{getCurrentTime()} </CurrentTime>
              </div>
              <ChatText isMyMessage={message.senderId === currentMyId}>
                {message.text}
              </ChatText>
            </ChatWrapper>
          ))}
        </ChatList>
      </ChatRoomContainer>
      <ChatInputWrapper onSubmit={handleInputSubmit}>
        <button type="button">
          <FileInputIcon alt="파일 첨부 아이콘" />
        </button>
        <button type="button">
          <AudioIcon alt="음성 텍스트 입력 아이콘" />
        </button>
        <input
          placeholder="메시지"
          onChange={handleChangeInputValue}
          value={inputValue}
        />
        <button>
          <EmogiIcon className="emogi_icon" alt="이모지 아이콘" />
        </button>
      </ChatInputWrapper>
    </>
  );
}

export default ChatRoom;

const ChatRoomContainer = styled.div`
  height: 74rem;
  ${flexColumn}
  padding: 0 1.6rem;
  flex: 1;
`;

const ChatRoomHeader = styled.div`
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

const ChatInputWrapper = styled.form`
  background: var(--gray01);
  box-shadow: 0px -0.33px 0px 0px #a6a6aa;
  ${flexCenter}
  gap : 0.5rem;
  height: 4.5rem;
  position: relative;

  input {
    width: 28.3rem;
    height: 3.3rem;
    border-radius: 1.65rem;
    border: 0.1rem solid var(--gray03);
    background: var(--white);
    padding: 0.5rem 1.3rem;
    font-size: 1.7rem;
  }

  .emogi_icon {
    position: absolute;
    right: 2.3rem;
    top: 0.6rem;
  }
`;

const ChatList = styled.div`
  display: flex;
  gap: 1.6rem;
  flex-direction: column;
  padding: 2.5rem 0;
  overflow-y: auto;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
`;

const ChatWrapper = styled.div<{ isMyMessage: boolean }>`
  display: flex;
  gap: 1.2rem;

  justify-content: flex-end;

  flex-direction: ${({ isMyMessage }) => (isMyMessage ? "row" : "row-reverse")};
  .time_wrapper {
    display: flex;
  }
`;

const CurrentTime = styled.p`
  display: flex;
  align-items: flex-end;
  color: var(--gray04);
  font-size: 1rem;
  letter-spacing: 0.01rem;
`;

const ChatText = styled.p<{ isMyMessage: boolean }>`
  display: flex;

  padding: 0.7rem 1.5rem;
  color: var(--black);
  font-feature-settings:
    "clig" off,
    "liga" off;

  border-radius: 1.8rem 1.8rem 1.75rem 0rem;
  border: 1px solid var(--blue03);
  background: var(--white);

  ${({ isMyMessage }) =>
    isMyMessage &&
    `
    border-radius: 1.8rem 1.8rem 0rem 1.75rem;
    background: var(--blue03);
    
  `}

  font-size: 1.7rem;
  line-height: 2.2rem;
  letter-spacing: -0.04rem;
`;
