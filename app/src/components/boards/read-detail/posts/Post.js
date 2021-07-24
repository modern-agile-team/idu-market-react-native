import React, { useContext, useState, useEffect } from "react";
import { Alert, Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { REACT_NATIVE_API_KEY } from "@env";

import { ProgressContext, ReadyContext } from "../../../../contexts";

const Container = styled.View`
  flex: 1;
`;

const LabelBox = styled.View`
  flex: 1;
  flex-direction: row;
`;

const Label = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.greyBottomLine};
`;

const NameBox = styled.View`
  flex: 1;
  margin-left: 5px;
`;

const PostBtn = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
`;

const Subscribe = styled.TouchableOpacity`
  padding: 10px;
`;

const ContentTitle = styled.View`
  padding: 12px;
`;

const Title = styled.Text``;

const Description = styled.Text`
  padding: 10px;
  line-height: 15px;
`;

const Post = ({
  title,
  nickname,
  content,
  inDate,
  profilePath,
  studentId,
  price,
  images,
  category,
  boardNum,
  isWatchlist,
  id,
  navigation,
}) => {
  const [watchlist, setWatchlist] = useState(isWatchlist);

  const { spinner } = useContext(ProgressContext);
  const { readyDispatch } = useContext(ReadyContext);

  const theme = useContext(ThemeContext);

  const _handleUpdateWatchlistSucess = () => {
    setWatchlist(true);
    readyDispatch.notReady();
    Alert.alert("관심목록에 등록되었습니다.");
  };

  const _handleWatchlistDeleteSucess = () => {
    setWatchlist(false);
    readyDispatch.notReady();
    Alert.alert("관심목록 취소되었습니다.");
  };

  const _handlePostDeleteSucess = () => {
    readyDispatch.notReady();
    navigation.navigate("Market");
    Alert.alert("게시글이 정상적으로 삭제되었습니다.");
  };

  const _handlePostUpdate = () => {
    navigation.navigate("PostUpdate", {
      boardNum: `${boardNum}`,
      category: `${category}`,
      title: `${title}`,
      price: `${price}`,
      content: `${content}`,
      image: `${images}`,
      id: `${id}`,
    });
  };

  const _handlePostDeleteBtnPress = (params) => {
    Alert.alert(
      "", // 제목
      "게시글을 삭제 하시겠습니까?", // 부제목
      [
        // 버튼 배열
        {
          text: "예",
          onPress: _handlePostDelete,
          style: "cancel",
        },
        {
          text: "아니요",
          onPress: () => Alert.alert("취소 되었습니다"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const _handlePostUpdateBtnPress = (params) => {
    Alert.alert(
      "", // 제목
      "수정 하시겠습니까?", // 부제목
      [
        // 버튼 배열
        {
          text: "예",
          onPress: _handlePostUpdate,
          style: "cancel",
        },
        {
          text: "아니요",
          onPress: () => Alert.alert("취소 되었습니다"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const _handleWatchlist = async () => {
    try {
      spinner.start();

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": REACT_NATIVE_API_KEY,
        },
        body: JSON.stringify({
          boardNum: boardNum,
          categoryName: category,
        }),
      };

      const response = await fetch(
        `https://idu-market.shop:9800/api/watchlist/${id}`,
        config
      );
      const json = await response.json();
      json.success ? _handleUpdateWatchlistSucess(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("게시글 정보를 불러오지 못했습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handleWatchlistDelete = async () => {
    try {
      spinner.start();

      const config = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": REACT_NATIVE_API_KEY,
        },
        body: JSON.stringify({
          boardNum: boardNum,
        }),
      };

      const response = await fetch(
        `https://idu-market.shop:9800/api/watchlist/${id}`,
        config
      );
      const json = await response.json();
      json.success ? _handleWatchlistDeleteSucess(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("게시글 정보를 불러오지 못했습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  const _handlePostDelete = async () => {
    try {
      spinner.start();

      const config = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-key": REACT_NATIVE_API_KEY,
        },
      };

      const response = await fetch(
        `https://idu-market.shop:9800/api/boards/${category}/${boardNum}`,
        config
      );
      const json = await response.json();
      console.log(json);
      json.success ? _handlePostDeleteSucess(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("삭제 실패하였습니다.", e.message);
    } finally {
      spinner.stop();
    }
  };

  return (
    <Container>
      <LabelBox>
        <Label>
          <MaterialCommunityIcons
            name="face-profile"
            size={52}
            color={theme.profileImageColor}
          />
          <NameBox>
            <Text style={{ fontSize: 18, fontWeight: "bold", margin: 2 }}>
              {nickname}
            </Text>
            <Text>{studentId}</Text>
          </NameBox>
          {studentId === id ? (
            <>
              <PostBtn onPress={_handlePostUpdateBtnPress}>
                <Text style={{ color: "#fff" }}>수정</Text>
              </PostBtn>
              <PostBtn onPress={_handlePostDeleteBtnPress}>
                <Text style={{ color: "#fff" }}>삭제</Text>
              </PostBtn>
            </>
          ) : (
            <></>
          )}
          {watchlist ? (
            <Subscribe onPress={_handleWatchlistDelete}>
              <Feather name="heart" size={32} color="red" />
            </Subscribe>
          ) : (
            <Subscribe onPress={_handleWatchlist}>
              <Feather name="heart" size={32} color="gray" />
            </Subscribe>
          )}
        </Label>
      </LabelBox>

      <ContentTitle>
        <Title
          style={{ fontSize: 21, fontFamily: "sans-serif", fontWeight: "bold" }}
        >
          {title}
        </Title>
        <Text style={{ fontSize: 20, paddingTop: 10 }}>{price} 원</Text>
        <Text
          style={{
            fontSize: 12,
            color: "gray",
            paddingTop: 10,
            position: "absolute",
            bottom: 10,
            right: 10,
          }}
        >
          {inDate}
        </Text>
      </ContentTitle>

      <Description>{content}</Description>
    </Container>
  );
};

export default Post;
