import React, { useState, useContext } from "react";
import { View, Alert, Text } from "react-native";
// import { ScrollView } from "react-native-keyboard-aware-scroll-view";
import styled, { ThemeContext } from "styled-components/native";
import AppLoading from "expo-app-loading";

import moment from "moment";

import { ProgressContext } from "../../../contexts";

import ImageSliderContainer from "../../../components/boards/read-detail/ImageSliderContainer";
import PostContainer from "../../../components/boards/read-detail/PostContainer";
import PostContainers from "../../../components/boards/read-detail/PostContainers";
import CommentContainers from "../../../components/boards/read-detail/CommentContainers";

const ScrollView = styled.ScrollView``;

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
        `http://13.125.55.135:9800/api/boards/book/934/202016709`,
        config
      );
      const json = await response.json();
      if (json.success) {
        setImages([...images, ...json.images]);
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
    <ScrollView>
      <Container>
        <ImageSliderContainer images={images} />
        <PostContainer getDateOrTime={getDateOrTime} />
      </Container>
      {/* <PostContainers getDateOrTime={getDateOrTime} />
          <CommentContainers getDateOrTime={getDateOrTime} /> */}
    </ScrollView>
  ) : (
    <AppLoading
      startAsync={_loadBoard}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}

export default DetailView;
