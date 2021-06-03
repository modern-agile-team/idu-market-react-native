import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

const CommentItems = styled.View`
  padding: 10px 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.greyBottomLine};
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
  padding-top: 5px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const CommentDescription = styled.Text.attrs(() => ({
  numberOfLines: 4,
}))`
  width: 100%;
  padding: 3px;
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

const Reply = styled.Pressable.attrs({
  hitSlop: 10,
})`
  align-self: flex-end;
  align-items: center;
  width: 18%;
  padding: 3px;
  margin-top: 6px;
  color: ${({ theme }) => theme.background};
  background-color: ${({ theme }) => theme.boardsButton};
  border-radius: 12px;
`;

const ReplyText = styled.Text`
  color: ${({ theme }) => theme.background};
  padding: 3px;
`;

const Item = React.memo(({ item }) => {
  const theme = useContext(ThemeContext);

  const content = item.content
    .replace(/<p>/g, "")
    .replace(/<br \/>/g, "\n")
    .replace(/<\/p>/g, "\n");

  // console.log(item);
  return (
    <CommentItems>
      <CommentLabel>
        <ProfileImage
          source={{
            uri: "https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/profile/1.png",
          }}
        />
        <CommentId>{item.nickname}</CommentId>
        <TimeBox>
          <Time>{item.inDate}</Time>
        </TimeBox>
      </CommentLabel>
      <CommentDescription>{content}</CommentDescription>
      <Reply>
        <ReplyText>답글</ReplyText>
      </Reply>
    </CommentItems>
  );
});

export default Item;
