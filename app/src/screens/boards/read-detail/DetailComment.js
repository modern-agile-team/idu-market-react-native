import React, { useState, useContext, useEffect } from "react";
import { Alert, Text, Modal } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled, { ThemeContext } from "styled-components/native";
import AppLoading from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";
import { REACT_NATIVE_API_KEY } from "@env";

import { ProgressContext, ReadyContext } from "../../../contexts";

// const Container = styled.View`
//   flex: 1;
//   background-color: ${({ theme }) => theme.background};
// `;

const UpdateContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.background};
  align-items: flex-end;
  margin-top: 20px;
  width: 90%;
  padding-left: 10px;
`;

const ModalInput = styled.View`
  width: 100%;
  flex-direction: row;
`;

const UpdateButtonContainer = styled.View`
  flex-direction: row;
  padding-right: 12px;
`;

const UpdateBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
`;

const InputComment = styled.TextInput`
  border-radius: 30px;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.commentInput};
  width: 80%;
  height: 36px;
  padding-left: 10px;
`;

const InputButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  justify-content: center;
  align-items: center;
  width: 15%;
  margin-left: 10px;
  margin-top: 10px;
  border-radius: 30px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const Content = styled.View`
  border-radius: 30px;
  background-color: ${({ theme }) => theme.commentInput};
  width: 80%;
  height: 36px;
  padding-left: 10px;
  justify-content: center;
`;

function DetailComment({ route, navigation }) {
  const [disabled, setDisabled] = useState(true);
  const [content, setContent] = useState("");
  const [isUpdate, setIsUpdate] = useState(true);

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const { category } = route.params;
  const { boardNum } = route.params;
  const { commentId } = route.params;
  const { commentNum } = route.params;
  const { clickComment } = route.params;
  const { id } = route.params;
  const { depth } = route.params;

  const _handleContentChange = (content) => {
    setContent(content);
  };

  const _handleSuccessUpdate = (json) => {
    Alert.alert("정상적으로 수정 되었습니다.");
    // navigation.navigate("DetailView", {
    //   boardNum: `${boardNum}`,
    //   category: `${category}`,
    // });
    navigation.navigate("Market");
  };

  const _handleSuccessDelete = (json) => {
    Alert.alert("정상적으로 삭제 되었습니다.");
    // navigation.navigate("DetailView", {
    //   boardNum: `${boardNum}`,
    //   category: `${category}`,
    // });
    navigation.navigate("Market");
  };

  const _handleContentUpdate = async () => {
    try {
      spinner.start();

      const config = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": REACT_NATIVE_API_KEY,
        },
        body: JSON.stringify({
          studentId: id,
          content: content,
        }),
      };

      let response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}/${boardNum}/${commentNum}`,
        config
      );
      console.log(json);
      let json = await response.json();
      json.success ? _handleSuccessUpdate(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("답글 수정 실패", e.message);
    } finally {
      setIsUpdate(false);
      spinner.stop();
    }
  };

  const _handleContentDelete = async () => {
    try {
      spinner.start();

      const config = {
        method: "Delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": REACT_NATIVE_API_KEY,
        },
        body: JSON.stringify({
          studentId: id,
          depth: depth,
        }),
      };

      let response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}/${boardNum}/${commentNum}`,
        config
      );
      console.log(json);
      let json = await response.json();
      json.success ? _handleSuccessDelete(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("답글 삭제 실패", e.message);
    } finally {
      setIsUpdate(false);
      spinner.stop();
    }
  };

  const _handelUpdateBtn = () => {
    setIsUpdate(false);
  };

  useEffect(() => {
    setDisabled(!content);
  }, [content]);

  return (
    <KeyboardAwareScrollView>
      <>
        <UpdateContainer>
          <ModalInput>
            {isUpdate ? (
              <>
                {commentId === id ? (
                  <>
                    <Content>
                      <Text> {clickComment}</Text>
                    </Content>
                    <UpdateButtonContainer>
                      <UpdateBtn onPress={_handelUpdateBtn}>
                        <Text style={{ color: "#fff" }}>수정</Text>
                      </UpdateBtn>

                      <UpdateBtn onPress={_handleContentDelete}>
                        <Text style={{ color: "#fff" }}>삭제</Text>
                      </UpdateBtn>
                    </UpdateButtonContainer>
                  </>
                ) : (
                  <Content>
                    <Text> {clickComment}</Text>
                  </Content>
                )}
              </>
            ) : (
              <>
                <InputComment
                  onChangeText={_handleContentChange}
                  placeholder="수정 내용을 입력해주세요"
                  returnKeyType="done"
                />

                <InputButton disabled={disabled} onPress={_handleContentUpdate}>
                  <MaterialIcons name="send" size={13} color={"#fff"} />
                </InputButton>
              </>
            )}
          </ModalInput>
        </UpdateContainer>
      </>
    </KeyboardAwareScrollView>
  );
}

export default DetailComment;
