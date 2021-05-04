import React, { useContext, useState, useEffect } from "react";
import { FlatList } from "react-native-gesture-handler";
import styled, { ThemeContext } from "styled-components/native";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import FAB from "react-native-fab";
import AppLoding from "expo-app-loading";
import { ProgressContext } from "../contexts";
import { View } from "react-native";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 10px 10px 15px 10px;
  flex-direction: row;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const ItemStudent = styled.Text`
  padding-top: 3px;
  padding-left: 3px;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  width: 200px;
  font-size: 20px;
  font-weight: 600;
`;

const ItemRowContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  flex-direction: row;
  width: 100%;
`;
const ItemComment = styled.Text`
  padding-left: 5px;
  color: ${({ theme }) => theme.listTime};
`;
const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.listTime};
  position: absolute;
  right: 0px;
  padding-top: 20px;
`;

const ImageContanier = styled.Image`
  width: 120px;
  height: 140px;
  border-radius: 10px;
`;

const StatusText = styled.Text`
  padding-top: 5px;
  margin-left: auto;
  font-size: 16px;
`;

const Item = React.memo(
  // 같은내용이 리렌더링되는것을 막아준다.
  ({ item }) => {
    const theme = useContext(ThemeContext);

    const changeStatus = ({ item }) => {
      if (item.status === 0) return "판매중";
      if (item.status === 1) return "예약중";
      if (item.status === 2) return "판매완료";
    };

    return (
      <View style={{ marginVertical: 8 }}>
        <ItemContainer
          onPress={() =>
            navigation.navigate("ViewDetail", {
              board: item,
            })
          }
        >
          <ImageContanier source={{ uri: item.thumbnail }} resizeMode="cover" />
          <ItemTextContainer>
            <View>
              <ItemRowContainer>
                <ItemTitle>{item.title}</ItemTitle>
                <StatusText>{changeStatus({ item })}</StatusText>
              </ItemRowContainer>
              <ItemRowContainer>
                <MaterialIcons name="person" size={24} color={theme.listIcon} />
                <ItemStudent>{item.nickname}</ItemStudent>
              </ItemRowContainer>
              <ItemRowContainer>
                <MaterialIcons name="payment" size={25} />
                <ItemStudent>{item.price}원</ItemStudent>
              </ItemRowContainer>
              <ItemRowContainer>
                <FontAwesome5 name="comment-dots" size={22} color="black" />
                <ItemComment>{item.commentCount}</ItemComment>
                <ItemTime>{item.inDate}</ItemTime>
              </ItemRowContainer>
            </View>
          </ItemTextContainer>
        </ItemContainer>
      </View>
    );
  }
);

function FreeBoard({ navigation }) {
  const [isReady, setIsReady] = useState(false);
  const [boards, setBoards] = useState([]);

  const { spinner } = useContext(ProgressContext);

  const _loadBoards = async () => {
    try {
      spinner.start();

      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };

      const response = await fetch(
        "http://13.125.55.135:9800/api/boards/book",
        config
      );
      const json = await response.json();
      json.success ? setBoards(json.boards) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("실패", e.message);
    } finally {
      spinner.stop();
    }
  };
  useEffect(() => {
    _loadBoards();
  }, []);

  const _handleItemPress = (params) => {
    navigation.navigate("ViewDetail", params);
  };
  const _handleWritePress = (params) => {
    navigation.navigate("PostWrite", params);
  };

  return isReady ? (
    <Container>
      <FlatList
        keyExtractor={(item) => `${item.id}`}
        data={boards}
        renderItem={({ item }) => (
          <Item item={item} onPress={_handleItemPress} />
        )}
        windowSize={3} // 렌더링 되는양을 조절
      />
      <FAB
        buttonColor="#e84118"
        iconTextColor="#ffffff"
        onClickAction={_handleWritePress}
        visible={true}
        iconTextComponent={<MaterialIcons name="edit" />}
      />
    </Container>
  ) : (
    <AppLoding
      startAsync={_loadBoards}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}

export default FreeBoard;
