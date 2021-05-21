import React, { useState, useContext } from "react";
import { Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styled, { ThemeContext } from "styled-components/native";
import { FlatList } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";

import moment from "moment";
import ImageSliderContainer from "../../../components/boards/read-detail/ImageSliderContainer";
import Post from "../../../components/boards/read-detail/posts/Post";
import PostContainer from "../../../components/boards/read-detail/PostContainer";
import Item from "../../../components/boards/read-detail/comments/Item";
import CommentContainer from "../../../components/boards/read-detail/comments/CommentContainer";
import { getItemFromAsync } from "../../../utils/AsyncStorage";
import { ProgressContext } from "../../../contexts";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const getDateOrTime = (ts) => {
  const now = moment().startOf("day");
  const target = moment(ts).startOf("day");
  return moment(ts).format(now.diff(target, "days") > 0 ? "MM/DD" : "HH:mm");
};

function DetailView({ route, navigation }) {
  const theme = useContext(ThemeContext);
  const { spinner } = useContext(ProgressContext);

  const [isReady, setIsReady] = useState(false);
  const [board, setBoard] = useState("");
  const [images, setImages] = useState([]);
  const [comments, setCommnets] = useState();

  const _loadBoard = async () => {
    try {
      spinner.start();

      const id = await getItemFromAsync("id");
      const { category } = route.params;
      const { boardNum } = route.params;

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
        // console.log(json.comments);
      } else {
        Alert.alert(json.msg);
      }
    } catch (e) {
      Alert.alert("게시글 정보를 불러오지 못했습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  const detailViewInfo = () => {
    const content = board.content.replace(/(?:\r\n|\r|\n)/g, " <br /> ");

    return (
      <Post
        title={board.title}
        nickname={board.nickname}
        content={content}
        inDate={board.inDate}
        profilePath={board.profilePath}
        studentId={board.studentId}
      />
    );
  };

  return isReady ? (
    <KeyboardAwareScrollView>
      <Container>
        <ImageSliderContainer images={images} />
        <>{detailViewInfo()}</>
        <CommentContainer />
        <FlatList
          keyExtractor={(item) => `${item.num}`}
          data={comments}
          renderItem={({ item }) => <Item item={item} />}
          windowSize={3} //렌더링 되는양을 조절
        />
      </Container>
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
