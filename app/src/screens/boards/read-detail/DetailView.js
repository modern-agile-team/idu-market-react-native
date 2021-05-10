import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled, { ThemeContext } from "styled-components/native";
import AppLoading from "expo-app-loading";

import moment from "moment";
import { ProgressContext } from "../../../contexts";
import ImageSliderContainer from "../../../components/boards/read-detail/ImageSliderContainer";
import PostContainer from "../../../components/boards/read-detail/PostContainer";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const getDateOrTime = (ts) => {
  const now = moment().startOf("day");
  const target = moment(ts).startOf("day");
  return moment(ts).format(now.diff(target, "days") > 0 ? "MM/DD" : "HH:mm");
};

function DetailView() {
  const theme = useContext(ThemeContext);
  const { spinner } = useContext(ProgressContext);

  const [isReady, setIsReady] = useState(false);
  const [board, setBoard] = useState({});
  const [comments, setComments] = useState([]);
  const [images, setImages] = useState([]);

  const _loadBoard = async () => {
    try {
      spinner.start();

      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      const response = await fetch(
        `http://13.125.55.135:9800/api/boards/book/933/202016704`,
        config
      );
      const json = await response.json();
      if (json.success) {
        setImages([...images, ...json.images]);
        setBoard({ ...board, ...json.board });
        setComments([...comments, ...json.comments]);
      } else {
        Alert.alert(json.msg);
      }
    } catch (e) {
      Alert.alert("게시글 정보를 불러오지 못했습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };
  return isReady ? (
    <KeyboardAwareScrollView>
      <Container>
        <ImageSliderContainer images={images} />
        <PostContainer board={board} comments={comments} />
      </Container>
      {/* <PostContainers getDateOrTime={getDateOrTime} />
          <CommentContainers getDateOrTime={getDateOrTime} /> */}
    </KeyboardAwareScrollView>
  ) : (
    <AppLoading
      startAsync={_loadBoard}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}

export default DetailView;
