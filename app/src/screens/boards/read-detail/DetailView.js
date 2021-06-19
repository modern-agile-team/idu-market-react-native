import React, { useState, useContext, useEffect } from "react";
import { Alert, Text, Modal } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled, { ThemeContext } from "styled-components/native";
import { FlatList } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import { MaterialIcons } from "@expo/vector-icons";

import moment from "moment";
import ImageSliderContainer from "../../../components/boards/read-detail/ImageSliderContainer";
import Post from "../../../components/boards/read-detail/posts/Post";
import Item from "../../../components/boards/read-detail/comments/Item";
import CommentContainer from "../../../components/boards/read-detail/comments/CommentContainer";
import { getItemFromAsync } from "../../../utils/AsyncStorage";
import { ProgressContext, ReadyContext } from "../../../contexts";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const UpdateContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.background};
  align-items: flex-end;
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 10px;
  border-top-width: 1px;
`;

const ModalClose = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.background};
  border: 1px;
  padding: 5px 10px;
  border-radius: 4px;
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

function DetailView({ route }) {
  const [isReady, setIsReady] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [board, setBoard] = useState("");
  const [images, setImages] = useState([]);
  const [comments, setCommnets] = useState();
  const [isId, setIsId] = useState("");
  const [isWatchlist, setIsWatchlist] = useState("");
  const [hit, setHit] = useState(hit);
  const [isModal, setIsModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [content, setContent] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [clickComment, setClickComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [commentNum, setCommentNum] = useState("");

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const { category } = route.params;
  const { boardNum } = route.params;

  const _loadDetailView = async () => {
    try {
      spinner.start();

      const id = await getItemFromAsync("id");
      setIsId(id);

      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}/${boardNum}/${id}`,
        config
      );
      const json = await response.json();

      if (json.success) {
        setImages([...images, ...json.images]);
        setBoard(json.board);
        setCommnets(json.comments);
        setIsWatchlist(json.isWatchList);

        readyDispatch.notReady();
      } else {
        Alert.alert(json.msg);
      }
    } catch (e) {
      Alert.alert("게시글 정보를 불러오지 못했습니다.", e.message);
    } finally {
      spinner.stop();
    }

    try {
      const config = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hit: hit,
        }),
      };

      const response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}/${boardNum}`,
        config
      );

      const json = await response.json();
      json.success ? setHit(json.hit) : Alert.alert(json.msg);
    } catch (e) {
    } finally {
    }
  };

  const _handleContentChange = (content) => {
    setContent(content);
  };

  const _handleSuccessUpdate = (json) => {
    readyDispatch.notReady();
    Alert.alert("정상적으로 수정 되었습니다.");
  };

  const _handleContentUpdate = async () => {
    try {
      spinner.start();

      const config = {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: isId,
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

  const detailViewInfo = () => {
    const content = board.content
      .replace(/<(\/span|span)([^>]*)>/gi, "")
      .replace(/<(\/strong|strong)([^>]*)>/gi, "")
      .replace(/<(\/p|p)([^>]*)>/gi, "\n")
      .replace(/<(\/br|br)([^>]*)>/gi, "\n")
      .replace(/<(\/em|em)([^>]*)>/gi, "")
      .replace(/<(\/u|u)([^>]*)>/gi, "")
      .replace(/<(\/blockquote|blockquote)([^>]*)>/gi, "")
      .replace(/<(\/s|s)([^>]*)>/gi, "");
    // replace(/(<([^>]+)>)/ig,"");
    return (
      <Post
        title={board.title}
        nickname={board.nickname}
        content={content}
        inDate={board.inDate}
        profilePath={board.profilePath}
        studentId={board.studentId}
        category={category}
        boardNum={boardNum}
        isWatchlist={isWatchlist}
        id={isId}
      />
    );
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setIsModal(!isModal);
    setIsUpdate(false);
  };

  const _handelUpdateBtn = () => {
    setIsUpdate(true);
  };

  useEffect(() => {
    setDisabled(!content);
  }, [content]);

  return isReady ? (
    <KeyboardAwareScrollView>
      <Container>
        <ImageSliderContainer images={images} />
        <>{detailViewInfo()}</>

        <CommentContainer id={isId} category={category} boardNum={boardNum} />
        <FlatList
          keyExtractor={(item) => `${item.num}`}
          data={comments}
          renderItem={({ item }) => (
            <Item
              item={item}
              id={isId}
              category={category}
              boardNum={boardNum}
              setIsModal={setIsModal}
              setClickComment={setClickComment}
              setCommentId={setCommentId}
              setCommentNum={setCommentNum}
            />
          )}
          windowSize={3} //렌더링 되는양을 조절
        />
      </Container>
      {isModal ? (
        <Modal
          animationType="slide"
          transparent={true}
          isVisible={isModalVisible}
          onRequestClose={() => {}}
        >
          <UpdateContainer>
            <ModalClose onPress={toggleModal}>
              <Text style={{ color: "#222" }}>X</Text>
            </ModalClose>
            <ModalInput>
              {isUpdate ? (
                <>
                  <InputComment
                    onChangeText={_handleContentChange}
                    placeholder="수정 내용을 입력해주세요"
                    returnKeyType="done"
                  />

                  <InputButton
                    disabled={disabled}
                    onPress={_handleContentUpdate}
                  >
                    <MaterialIcons name="send" size={13} color={"#fff"} />
                  </InputButton>
                </>
              ) : (
                <>
                  {commentId === isId ? (
                    <>
                      <Content>
                        <Text> {clickComment}</Text>
                      </Content>
                      <UpdateButtonContainer>
                        <UpdateBtn onPress={_handelUpdateBtn}>
                          <Text style={{ color: "#fff" }}>수정</Text>
                        </UpdateBtn>

                        <UpdateBtn>
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
              )}
            </ModalInput>
          </UpdateContainer>
        </Modal>
      ) : (
        <></>
      )}
    </KeyboardAwareScrollView>
  ) : (
    <AppLoading
      startAsync={_loadDetailView}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}

export default DetailView;
