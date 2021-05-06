import React, { useState, useContext } from "react";
import { Alert, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled, { ThemeContext } from "styled-components/native";

import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 10px;
`;

const PostHead = styled.Text`
  border-bottom-width: 1px;
  width: 40%;
  margin-bottom: 10px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const PostRowContainer = styled.View`
  padding-top: 5px;
  flex-direction: row;
  width: 100%;
`;

const PostStudent = styled.Text`
  padding-top: 3px;
  padding-left: 3px;
`;

const PostModify = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  position: absolute;
  right: 80px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
`;

const PostRemove = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  position: absolute;
  right: 40px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
`;

const PostTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
  position: absolute;
  right: 0;
  padding-top: 20px;
`;

const PostContent = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  margin-top: 40px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const CommentContainer = styled.View`
  background-color: ${({ theme }) => theme.background};
  margin-top: 10px;
`;

const CommentTitle = styled.Text``;

const CommnetInputContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const CommentInput = styled.TextInput`
  border-radius: 30px;
  background-color: ${({ theme }) => theme.commentInput};
  width: 80%;
  height: 50px;
  padding-left: 10px;
`;

const CommentBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  height: 50px;
  width: 60px;
  border-radius: 30px;
  margin-left: 10px;
  padding: 12px 20px;
`;

const ItemContainer = styled.View`
  align-items: center;
  padding: 10px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  align-items: flex-start;
  width: 100%;
`;

const ItemStudent = styled.Text`
  padding-left: 3px;
  padding-top: 5px;
`;

const ItemDescription = styled.Text.attrs(() => ({
  numberOfLines: 3,
}))`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const ItemRowContainer = styled.View`
  flex: 1;
  flex-direction: row;
  width: 100%;
`;
const ItemComment = styled.TouchableOpacity`
  padding-left: 5px;
  padding-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
  padding-left: 10px;
  padding-top: 10px;
`;

const getDateOrTime = (ts) => {
  const now = moment().startOf("day");
  const target = moment(ts).startOf("day");
  return moment(ts).format(now.diff(target, "days") > 0 ? "MM/DD" : "HH:mm");
};

const commentItem = [];
for (let idx = 0; idx < 10; idx++) {
  commentItem.push({
    id: idx,
    title: `제목 ${idx}`,
    description: `댓글 내용 푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~푸항항 ~ 푸헹헹 ~ 포항항 ~`,
    createAt: idx,
  });
}

const Item = React.memo(
  ({ item: { id, title, description, createdAt }, onPress }) => {
    const theme = useContext(ThemeContext);

    return (
      <ItemContainer onPress={() => onPress({ id, title })}>
        <ItemRowContainer>
          <MaterialIcons name="person" size={30} color={theme.listIcon} />
          <ItemStudent>202012123</ItemStudent>
          <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
        </ItemRowContainer>
        <ItemTextContainer>
          <ItemDescription>{description}</ItemDescription>
        </ItemTextContainer>
        <ItemRowContainer>
          <ItemComment>
            <Text>답글쓰기</Text>
          </ItemComment>
        </ItemRowContainer>
      </ItemContainer>
    );
  }
);

function ViewDetail() {
  const [comment, setComment] = useState("");

  const _handlRemoveBtnPress = (params) => {
    Alert.alert(
      "", //제목
      "삭제하시겠습니까?", //부제목
      [
        //버튼 배열
        {
          text: "예",
          onPress: () => Alert.alert("삭제 되었습니다."),
          style: "cancel",
        },
        {
          text: "아니요",
          onPress: () => Alert.alert("취소 되었습니다."),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <PostHead>제목</PostHead>
        <PostRowContainer>
          <MaterialIcons name="person" size={24} />
          <PostStudent>202020111</PostStudent>
          <PostTime>{getDateOrTime()}</PostTime>
          <PostModify>
            <Text style={{ color: "#fff" }}>수정</Text>
          </PostModify>
          <PostRemove onPress={_handlRemoveBtnPress}>
            <Text style={{ color: "#fff" }}>삭제</Text>
          </PostRemove>
        </PostRowContainer>
        <PostContent>
          내용은 길고 험하지
          asdasdasdsdfsdㅁㄴㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇSDFJSDFJSFSFㄴㅇ론ㅇ런ㅇ런ㅇ런ㅇ런언ㅇ러
        </PostContent>
        <CommentContainer>
          <CommentTitle>댓글</CommentTitle>
          <CommnetInputContainer>
            <CommentInput
              onChangeText={(text) => setComment(text)}
              placeholder="댓글을 입력해주세요"
              returnKeyType="done"
            />
            <CommentBtn>
              <MaterialIcons name="send" size={24} color={"#fff"} />
            </CommentBtn>
          </CommnetInputContainer>
          <FlatList
            keyExtractor={(item) => item["id"].toString()}
            data={commentItem}
            renderItem={({ item }) => <Item item={item} />}
            windowSize={3} //렌더링 되는양을 조절
          />
        </CommentContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
}

export default ViewDetail;
