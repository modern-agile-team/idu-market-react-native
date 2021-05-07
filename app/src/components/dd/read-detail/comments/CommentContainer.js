import React, { useContext } from "react";
import { FlatList } from "react-native-gesture-handler";
import styled, { ThemeContext } from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";

const Container = styled.View`
  background-color: ${({ theme }) => theme.background};
  padding: 12px;
`;

const Label = styled.Text`
  color: ${({ theme }) => theme.imageButtonBackground};
`;

const InputContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.headerBottomColor};
`;

const Input = styled.TextInput`
  border-radius: 30px;
  background-color: ${({ theme }) => theme.commentInput};
  width: 80%;
  height: 36px;
  padding-left: 10px;
`;

const InputButton = styled.Pressable.attrs({
  hitSlop: 10,
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 36px;
  margin-left: 10px;
  background-color: ${({ theme }) => theme.boardsButton};
  border-radius: 30px;
`;

const CommentItems = styled.View`
  padding-top: 20px;
  padding-bottom: 20px;
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

const CommentContainer = ({ getDateOrTime }) => {
  const theme = useContext(ThemeContext);

  const commentItem = [];
  for (let idx = 0; idx < 10; idx++) {
    commentItem.push({
      id: idx,
      title: `제목 ${idx}`,
      description: `안녕하세요 박우림입니다. 안녕하세요 박우림입니다. 안녕하세요 박우림입니다. 안녕하세요 박우림입니다. 안녕하세요 박우림입니다. 안녕하세요 박우림입니다. 안녕하세요 박우림입니다. 안녕하세요 박우림입니다. 안녕하세요 박우림입니다. 안녕하세요 박우림입니다. `,
      createAt: idx,
    });
  }

  const Item = React.memo(
    ({ item: { id, title, description, createdAt }, onPress }) => {
      const theme = useContext(ThemeContext);

      return (
        <CommentItems>
          <CommentLabel>
            <ProfileImage
              source={{
                uri:
                  "https://wooahan-agile.s3.ap-northeast-2.amazonaws.com/profile/1.png",
              }}
            />
            <CommentId>202012123</CommentId>
            <TimeBox>
              <Time>{getDateOrTime(createdAt)}</Time>
            </TimeBox>
          </CommentLabel>
          <CommentDescription>{description}</CommentDescription>
          <Reply>
            <ReplyText>답글</ReplyText>
          </Reply>
        </CommentItems>
      );
    }
  );

  return (
    <Container>
      <Label>댓글</Label>
      <InputContainer>
        <Input
          onChangeText={(text) => setComment(text)}
          placeholder="댓글을 입력해주세요"
          returnKeyType="done"
        />
        <InputButton>
          <MaterialIcons name="send" size={13} color={"#fff"} />
        </InputButton>
      </InputContainer>
      <FlatList
        keyExtractor={(item) => item["id"].toString()}
        data={commentItem}
        renderItem={({ item }) => <Item item={item} />}
        windowSize={3} //렌더링 되는양을 조절
      />
    </Container>
  );
};

export default CommentContainer;
