import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, ScrollView, FlatList } from "react-native";
import { images } from "../constants";
import { MaterialIcons } from "@expo/vector-icons";
import FAB from "react-native-fab";

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
  justify-content: center;
`;
//category
const CategoryContainer = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  padding-left: 35px;
  margin-right: 55px;
`;

const CategoryText = styled.Text`
  font-size: 22px;
  color: ${({ theme }) => theme.marketFont};
`;

const ClickedCategoryText = styled.Text`
  font-size: 22px;
  color: ${({ theme }) => theme.marketClickFont};
`;

//item
const ItemContainer = styled.TouchableOpacity`
  flex: 1;
  border-top-width: 1px;
  flex-direction: row;
  padding: 25px 10px 3px 10px;
  border-color: ${({ theme }) => theme.marketBorder};
`;
// 묶어주는 Container
const ItemRowContainer = styled.View`
  flex: 1;
  padding-bottom: 10px;
  flex-direction: row;
  width: 100%;
`;

const ImageContanier = styled.Image`
  width: 120px;
  height: 140px;
  border-radius: 10px;
`;

const TitleText = styled.Text`
  padding-right: 40px;
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  color: ${({ theme }) => theme.marketFont};
`;

const ContentText = styled.Text`
  font-size: 16px;
  padding: 3px;
  color: ${({ theme }) => theme.marketFont};
`;

const StatusText = styled.Text`
  padding-top: 5px;
  margin-left: auto;
  font-size: 16px;
`;

const DateText = styled.Text`
  padding-top: 5px;
  margin-left: auto;
  font-size: 13px;
`;

const Markets = ({ navigation }) => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    return async () => {
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      };
      let response = await fetch(
        `http://13.125.55.135:9800/api/boards/book`,
        config
      );
      let result = await response.json();
      setBoards(result.boards);
    };
  }, []);

  const categoriesData = [
    {
      id: 1,
      categoryName: "교재",
      boards: boards,
    },
    {
      id: 2,
      categoryName: "it기기",
      boards: boards,
    },
    {
      id: 3,
      categoryName: "의류",
      boards: boards,
    },
  ];

  const [categories, setCategories] = useState(categoriesData);
  const [selectedCategory, setSelectedCategory] = useState(1);

  function renderCategoryHeader() {
    const renderItem = ({ item }) => {
      return (
        <CategoryContainer onPress={() => setSelectedCategory(item.id)}>
          {selectedCategory == item.id && (
            <ClickedCategoryText>{item.categoryName}</ClickedCategoryText>
          )}
          {selectedCategory != item.id && (
            <CategoryText>{item.categoryName}</CategoryText>
          )}
        </CategoryContainer>
      );
    };

    return (
      <View>
        <FlatList
          data={categories}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          horizontal
        />
      </View>
    );
  }

  function renderCategoryData() {
    let boards;
    // category 변경
    let selectedCategoryBoards = categories.filter(
      (category) => category.id == selectedCategory
    );

    // 카테고리의 board 정보 가져오기
    if (selectedCategoryBoards.length) {
      boards = selectedCategoryBoards[0].boards;
    }
    const changeStatus = ({ item }) => {
      if (item.status === 0) return "판매중";
      if (item.status === 1) return "예약중";
      if (item.status === 2) return "판매완료";
    };

    const renderItem = ({ item }) => {
      return (
        <View style={{ marginVertical: 8 }}>
          <ItemContainer
            onPress={() =>
              navigation.navigate("Detail", {
                board: item,
              })
            }
          >
            <ImageContanier source={item.thumnail} resizeMode="cover" />
            <View style={{ flex: 1, marginLeft: 12 }}>
              <View>
                <ItemRowContainer>
                  <TitleText>{item.title}</TitleText>
                  <StatusText>{changeStatus({ item })}</StatusText>
                </ItemRowContainer>
                <ItemRowContainer>
                  <MaterialIcons name="person" size={25} />
                  <ContentText>{item.nickname}</ContentText>
                </ItemRowContainer>
                <ItemRowContainer>
                  <MaterialIcons name="payment" size={25} />
                  <ContentText>{item.price}원</ContentText>
                </ItemRowContainer>

                <ItemRowContainer>
                  <MaterialIcons name="comment" size={25} />
                  <ContentText>{item.commentCount}</ContentText>
                  <DateText>{item.inDate}</DateText>
                </ItemRowContainer>
              </View>
            </View>
          </ItemContainer>
        </View>
      );
    };
    return (
      <View style={{ flex: 1, marginTop: 12 }}>
        <FlatList
          data={boards}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`} //각 키에 고유 키
          showsVerticalScrollIndicator={false} //스크롤 표시 X
        />
      </View>
    );
  }
  const _handleWritePress = (params) => {
    navigation.navigate("PostWrite", params);
  };
  if (boards !== []) {
    return (
      <Container>
        <ScrollView style={{ marginTop: 12 }}>
          <View style={{ marginTop: 12 }}>
            <View>{renderCategoryHeader()}</View>
            <View>{renderCategoryData()}</View>
          </View>
        </ScrollView>
        <FAB
          buttonColor="#e84118"
          iconTextColor="#ffffff"
          // onClickAction={_handleWritePress}
          visible={true}
          iconTextComponent={<MaterialIcons name="edit" />}
        />
      </Container>
    );
  }
};

export default Markets;