import React, { useState, useRef } from "react";
import { Alert, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";

import { Image } from "../../../components";
import { images } from "../../../utils/images";

const Container = styled.SafeAreaView`
  flex: 1;
  justiiscy-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const PostTitle = styled.TextInput`
  border-bottom-width: 1px;
  width: 100%;
  font-size: 20px;
  margin-top: 20px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const PostBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  position: absolute;
  right: 20px;
  margin-top: 10px;
  padding: 5px;
  border-radius: 10px;
`;

const PostContent = styled.TextInput`
  font-size: 15px;
  color: ${({ theme }) => theme.text};
  margin-top: 40px;
  padding-bottom: 10px;
`;

const PostImageContainer = styled.View`
  position: absolute;
  left: 15px;
  bottom: 0px;
  align-items: flex-start;
`;

function PostUpdate({ route, navigation }) {
  const [isTitle, setTitle] = useState("");
  const [isContent, setContent] = useState("");
  const [photoUrl, setPhotoUrl] = useState(images.photo);

  const contentRef = useRef();

  const { category } = route.params;
  const { boardNum } = route.params;
  const { title } = route.params;
  const { price } = route.params;
  const { content } = route.params;
  const { isImages } = route.params;
  const { id } = route.params;

  console.log(category);
  console.log(title);
  console.log(price);
  console.log(content);
  console.log(isImages);

  const _handleUpdateBtnPress = () => {
    Alert.alert("수정 되었습니다");
    navigation.navigate("Market");
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <PostBtn onPress={_handleUpdateBtnPress}>
          <Text style={{ color: "#fff" }}>수정</Text>
        </PostBtn>
        <PostTitle
          onChangeText={(text) => setTitle(text)}
          placeholder="제목"
          returnKeyType="next"
          onSubmitEditing={() => contentRef.current.focus()}
        ></PostTitle>
        <PostContent
          multiline
          ref={contentRef}
          onChangeText={(text) => setContent(text)}
          placeholder="내용을 입력해주세요"
          returnKeyType="done"
        />
        <PostImageContainer>
          <Image
            url={photoUrl}
            showButton
            onChangeImage={(url) =>
              setPhotoUrl(url)?.photoUrl ? setPhotoUrl(url) : ""
            }
          />
        </PostImageContainer>
      </Container>
    </KeyboardAwareScrollView>
  );
}

export default PostUpdate;
