import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

import InputContainer from "./InputContainer";

const CommentItems = styled.View`
  padding: ${({ isReply }) => (isReply ? "10px 0 10px 6px" : "20px 0 20px 0")}
  background-color: ${({ theme, isReply }) =>
    isReply ? theme.greyBottomLine : theme.background};
  border-top-width: ${({ isReply }) => (isReply ? "0" : "1px")};;
  border-top-color: ${({ theme, isReply }) =>
    isReply ? theme.background : "grey"};;
  border-bottom-width: ${({ isReply }) => (isReply ? "1px" : "0")};
  border-bottom-color: ${({ theme, isReply }) =>
    isReply ? theme.marketBorder : theme.background};
`;

const ProfileImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 26px;
  width: 26px;
  margin: 0 4px 0 4px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.boardsButton};
`;

const CommentLabel = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const CommentDescription = styled.Text.attrs(() => ({
  numberOfLines: 4,
}))`
  width: 100%;
  padding: 12px;
`;

const CommentId = styled.Text`
  color: ${({ theme }) => theme.commentIdColor};
`;

const TimeBox = styled.View`
  flex: 1;
  align-items: flex-end;
  width: 100%;
  padding-right: 12px;
`;

const Time = styled.Text`
  color: ${({ theme }) => theme.commentIdColor};
`;

const Comment = React.memo(({ comment, onPress }) => {
  const theme = useContext(ThemeContext);

  const isReply = comment.depth ? true : false;

  return (
    <CommentItems isReply={isReply}>
      <CommentLabel>
        <ProfileImage
          source={{
            uri: comment.profilePath,
          }}
        />
        <CommentId>{comment.nickname}</CommentId>
        <TimeBox>
          <Time>{comment.updateDate}</Time>
        </TimeBox>
      </CommentLabel>
      <CommentDescription>{comment.content}</CommentDescription>
      {isReply ? (
        <></>
      ) : (
        <InputContainer isReply={true} placeholder={"답글을 입력해주세요."} />
      )}
    </CommentItems>
  );
});

export default Comment;
