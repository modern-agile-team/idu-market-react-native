import React, { useState, useRef, useContext } from "react";
import { Alert, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled from "styled-components/native";

import { ProgressContext, ReadyContext } from "../../../contexts";
import { Image } from "../../../components";
import { images } from "../../../utils/images";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const PostTitle = styled.TextInput`
  border-bottom-width: 1px;
  width: 85%;
  font-size: 20px;
  margin-top: 20px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const PostPriceContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const PostPrice = styled.TextInput`
  border-bottom-width: 1px;
  width: 40%;
  margin-top: 20px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const PostBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  position: absolute;
  right: 20px;
  margin-top: 20px;
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
  const { category } = route.params;
  const { boardNum } = route.params;
  const { title } = route.params;
  const { price } = route.params;
  const { content } = route.params;
  const { image } = route.params;
  const { id } = route.params;

  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateContent, setUpdateContent] = useState(content);
  const [updatePrice, setUpdatePrice] = useState(price);
  const [updateImage, setUpdateImage] = useState([image]);
  const [photoUrl, setPhotoUrl] = useState(images.photo);

  const contentRef = useRef();

  const conversionIsPrice = updatePrice.replace(",", "");
  parseInt(conversionIsPrice);

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const _handlePostUpdateSucess = () => {
    readyDispatch.notReady();
    navigation.navigate("Market");
    Alert.alert("게시글이 정상적으로 수정되었습니다.");
  };

  const _handlePostUpdate = async () => {
    try {
      spinner.start();
      const config = {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updateTitle,
          content: updateContent,
          price: conversionIsPrice,
          images: updateImage,
        }),
      };
      const response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}/${boardNum}`,
        config
      );
      const json = await response.json();
      json.success ? _handlePostUpdateSucess(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("수정 실패하였습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        <PostBtn onPress={_handlePostUpdate}>
          <Text style={{ color: "#fff" }}>수정</Text>
        </PostBtn>
        <PostTitle
          onChangeText={(text) => setUpdateTitle(text)}
          placeholder="제목을 입력해주세요"
          returnKeyType="next"
          onSubmitEditing={() => contentRef.current.focus()}
        >
          {title}
        </PostTitle>
        <PostPriceContainer>
          <PostPrice
            onChangeText={(text) => setUpdatePrice(text)}
            placeholder="가격을 입력해주세요"
            returnKeyType="next"
            onSubmitEditing={() => contentRef.current.focus()}
          >
            {price}
          </PostPrice>
          <Text style={{ fontSize: 20 }}>원</Text>
        </PostPriceContainer>
        <PostContent
          multiline
          ref={contentRef}
          onChangeText={(text) => setUpdateContent(text)}
          placeholder="내용을 입력해주세요"
          returnKeyType="done"
        >
          {content}
        </PostContent>
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
