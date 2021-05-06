import React, { useContext } from "react";
import FAB from "react-native-fab";
import { FlatList } from "react-native-gesture-handler";
import styled, { ThemeContext } from "styled-components/native";

import moment from "moment";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

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
  flex-direction: column;
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

const ItemDescription = styled.Text.attrs(() => ({
  numberOfLines: 2,
}))`
  font-size: 16px;
  margin-top: 5px;
  color: ${({ theme }) => theme.listTime};
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

const getDateOrTime = (ts) => {
  const now = moment().startOf("day");
  const target = moment(ts).startOf("day");
  return moment(ts).format(now.diff(target, "days") > 0 ? "MM/DD" : "HH:mm");
};

const items = [];
for (let idx = 0; idx < 1000; idx++) {
  items.push({
    id: idx,
    title: `제목 asdasdasdasdasdasda${idx}`,
    description: `풀이돋고 이상의 꽃이 피고 희망의 놀이 뜨고 열락의 새가 운다 사랑의 풀이 없으면 인간은 사막이다풀이돋고 이상의 꽃이 피고 희망의 놀이 뜨고 열락의 새가 운다 사랑의 풀이 없으면 인간은 사막이다풀이돋고 이상의 꽃이 피고 희망의 놀이 뜨고 열락의 새가 운다 사랑의 풀이 없으면 인간은 사막이다`,
    createAt: idx,
  });
}

const Item = React.memo(
  // 같은내용이 리렌더링되는것을 막아준다.
  ({ item: { id, title, description, createdAt }, onPress }) => {
    const theme = useContext(ThemeContext);

    return (
      <ItemContainer onPress={() => onPress({ id, title })}>
        <ItemTextContainer>
          <ItemTitle>{title}</ItemTitle>
          <ItemRowContainer>
            <MaterialIcons name="person" size={24} color={theme.listIcon} />
            <ItemStudent>202020111</ItemStudent>
          </ItemRowContainer>
          <ItemDescription>{description}</ItemDescription>
        </ItemTextContainer>
        <ItemRowContainer>
          <FontAwesome5 name="comment-dots" size={22} color="black" />
          <ItemComment>12</ItemComment>
          <ItemTime>{getDateOrTime(createdAt)}</ItemTime>
        </ItemRowContainer>
      </ItemContainer>
    );
  }
);

function FreeBoard({ navigation }) {
  const _handleItemPress = (params) => {
    navigation.navigate("ViewDetail", params);
  };
  const _handleWritePress = (params) => {
    navigation.navigate("PostWrite", params);
  };

  return (
    <Container>
      <FlatList
        keyExtractor={(item) => item["id"].toString()}
        data={items}
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
  );
}

export default FreeBoard;
