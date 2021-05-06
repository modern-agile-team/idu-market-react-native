import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import styled, { ThemeContext } from 'styled-components/native';
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import FAB from 'react-native-fab';
import AppLoding from "expo-app-loading";
import { ProgressContext } from "../contexts";

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity`
  align-items: center;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
  padding: 15px 20px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
`;

const ItemStudent = styled.Text`
  padding-left: 3px;
  font-size: 10px;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  width: 60%;
  font-size: 16px;
  font-weight: 600;
`;

const ItemDescription = styled.Text.attrs(() => ({
  numberOfLines: 2,
}))`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
`;

const ItemRowContainer = styled.View`
    flex:1;
    padding-top: 10px;
    flex-direction: row;
    width: 100%;
    align-items: center;
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

const Item = React.memo( // 같은내용이 리렌더링되는것을 막아준다.
    ({ item }) => {
    const theme = useContext(ThemeContext);

    return (
      <ItemContainer onPress={() => 
        navigation.navigate("ViewDetail", {
          board: item,
        })
      }>
        <ItemTextContainer>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemRowContainer>
            <MaterialIcons
              name="person"
              size={24}
              color={theme.listIcon}
            />
            <ItemStudent>{item.nickname}</ItemStudent>
          </ItemRowContainer>
          <ItemDescription>{item.content}</ItemDescription>
        </ItemTextContainer>
        <ItemRowContainer>
          <FontAwesome5 name="comment-dots" size={22} color="black" />
          <ItemComment>{item.commentCount}</ItemComment>
          <ItemTime>{item.inDate}</ItemTime>
        </ItemRowContainer>
      </ItemContainer>
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
        "http://13.125.55.135:9800/api/boards/free", config
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

  const _handleItemPress = params => {
      navigation.navigate('ViewDetail', params);
  }
  const _handleWritePress = params => {
      navigation.navigate('PostWrite', params);
  }

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
          iconTextComponent={<MaterialIcons name="edit"/>} 
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