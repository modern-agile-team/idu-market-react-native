import React from "react";
import styled from "styled-components/native";
import { View, ScrollView, Text, Pressable, Image } from "react-native";
import { AntDesign, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

import { images } from "../constants";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  margin: 0;
  padding: 0;
`;

const Title = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const ItemList = styled.ScrollView.attrs((props) => ({
  horizontal: true,
}))`
  padding-left: 20px;
`;

const Item = styled.Pressable`
  flex: 1;
  margin-right: 20px;
  width: 150px;
`;

const ImageContainer = styled.View`
  border-radius: 12px;
  border-width: 1px;
  border-color: gray;
`;

const StyledImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 100px;
  width: 100%;
  border-radius: 12px;
`;

const ItemTitle = styled.Text.attrs(() => ({
  numberOfLines: 1,
}))`
  font-size: 18px;
  font-weight: bold;
  margin: 3px 0 0 3px;
`;

const ItemContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 3px 0 0 3px;
`;

const ItemContentText = styled.Text`
  font-size: 16px;
  padding: 3px;
  color: ${({ theme }) => theme.marketFont};
`;

const Main = ({ navigation }) => {
  return (
    <Container>
      <ScrollView style={{ flex: 1, width: "100%" }}>
        <View style={{ flex: 1 }}>
          <Title>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                fontFamily: "BM_HANNA_PRO",
              }}
            >
              📚 교재
            </Text>
            <Pressable
              hitSlop={10}
              onPress={() => navigation.navigate("Markets")}
            >
              <AntDesign name="right" size={26} color="black" />
            </Pressable>
          </Title>

          <ItemList>
            <Item hitSlop={10} onPress={() => navigation.navigate("Markets")}>
              <ImageContainer>
                <StyledImage source={images.avengers} />
              </ImageContainer>
              <ItemTitle>이것이 코딩테스트다.</ItemTitle>
              <ItemContent>
                <MaterialIcons name="person-outline" size={16} color="black" />
                <ItemContentText>201014709</ItemContentText>
              </ItemContent>
              <ItemContent>
                <FontAwesome5 name="comment-dots" size={16} color="black" />
                <ItemContentText>21</ItemContentText>
              </ItemContent>
            </Item>

            <Item>
              <ImageContainer>
                <StyledImage source={images.hardwork} />
              </ImageContainer>
              <ItemTitle>정통과 2학년 1학기 교재 저렴하게 팝니다.</ItemTitle>
              <ItemContent>
                <MaterialIcons name="person-outline" size={16} color="black" />
                <ItemContentText>201516063</ItemContentText>
              </ItemContent>
              <ItemContent>
                <FontAwesome5 name="comment-dots" size={16} color="black" />
                <ItemContentText>16</ItemContentText>
              </ItemContent>
            </Item>

            <Item>
              <ImageContainer>
                <StyledImage source={images.her} />
              </ImageContainer>
              <ItemTitle>아이폰 7팝니다.</ItemTitle>
              <ItemContent>
                <MaterialIcons name="person-outline" size={16} color="black" />
                <ItemContentText>202016709</ItemContentText>
              </ItemContent>
              <ItemContent>
                <FontAwesome5 name="comment-dots" size={16} color="black" />
                <ItemContentText>31</ItemContentText>
              </ItemContent>
            </Item>
          </ItemList>
        </View>

        <View style={{ flex: 1 }}>
          <Title>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                fontFamily: "BM_HANNA_PRO",
              }}
            >
              💻 IT 기기
            </Text>
            <Pressable
              hitSlop={10}
              onPress={() => navigation.navigate("Markets")}
            >
              <AntDesign name="right" size={26} color="black" />
            </Pressable>
          </Title>

          <ItemList>
            <Item hitSlop={10} onPress={() => navigation.navigate("Markets")}>
              <ImageContainer>
                <StyledImage source={images.her} />
              </ImageContainer>
              <ItemTitle>정통과 2학년 1학기 교재 저렴하게 팝니다.</ItemTitle>
              <ItemContent>
                <MaterialIcons name="person-outline" size={16} color="black" />
                <ItemContentText>202016709</ItemContentText>
              </ItemContent>
              <ItemContent>
                <FontAwesome5 name="comment-dots" size={16} color="black" />
                <ItemContentText>31</ItemContentText>
              </ItemContent>
            </Item>

            <Item>
              <ImageContainer>
                <StyledImage source={images.hardwork} />
              </ImageContainer>
              <ItemTitle>정통과 2학년 1학기 교재 저렴하게 팝니다.</ItemTitle>
              <ItemContent>
                <MaterialIcons name="person-outline" size={16} color="black" />
                <ItemContentText>202016709</ItemContentText>
              </ItemContent>
              <ItemContent>
                <FontAwesome5 name="comment-dots" size={16} color="black" />
                <ItemContentText>31</ItemContentText>
              </ItemContent>
            </Item>

            <Item>
              <ImageContainer>
                <StyledImage source={images.her} />
              </ImageContainer>
              <ItemTitle>정통과 2학년 1학기 교재 저렴하게 팝니다.</ItemTitle>
              <ItemContent>
                <MaterialIcons name="person-outline" size={16} color="black" />
                <ItemContentText>202016709</ItemContentText>
              </ItemContent>
              <ItemContent>
                <FontAwesome5 name="comment-dots" size={16} color="black" />
                <ItemContentText>31</ItemContentText>
              </ItemContent>
            </Item>
          </ItemList>
        </View>

        <View style={{ flex: 1 }}>
          <Title>
            <Text
              style={{
                fontSize: 26,
                fontWeight: "bold",
                fontFamily: "BM_HANNA_PRO",
              }}
            >
              🧶 의류
            </Text>
            <Pressable
              hitSlop={10}
              onPress={() => navigation.navigate("Markets")}
            >
              <AntDesign name="right" size={26} color="black" />
            </Pressable>
          </Title>

          <ItemList>
            <Item hitSlop={10} onPress={() => navigation.navigate("Markets")}>
              <ImageContainer>
                <StyledImage source={images.hardwork} />
              </ImageContainer>
              <ItemTitle>정통과 2학년 1학기 교재 저렴하게 팝니다.</ItemTitle>
              <ItemContent>
                <MaterialIcons name="person-outline" size={16} color="black" />
                <ItemContentText>202016709</ItemContentText>
              </ItemContent>
              <ItemContent>
                <FontAwesome5 name="comment-dots" size={16} color="black" />
                <ItemContentText>31</ItemContentText>
              </ItemContent>
            </Item>

            <Item>
              <ImageContainer>
                <StyledImage source={images.avengers} />
              </ImageContainer>
              <ItemTitle>정통과 2학년 1학기 교재 저렴하게 팝니다.</ItemTitle>
              <ItemContent>
                <MaterialIcons name="person-outline" size={16} color="black" />
                <ItemContentText>202016709</ItemContentText>
              </ItemContent>
              <ItemContent>
                <FontAwesome5 name="comment-dots" size={16} color="black" />
                <ItemContentText>31</ItemContentText>
              </ItemContent>
            </Item>

            <Item>
              <ImageContainer>
                <StyledImage source={images.her} />
              </ImageContainer>
              <ItemTitle>정통과 2학년 1학기 교재 저렴하게 팝니다.</ItemTitle>
              <ItemContent>
                <MaterialIcons name="person-outline" size={16} color="black" />
                <ItemContentText>202016709</ItemContentText>
              </ItemContent>
              <ItemContent>
                <FontAwesome5 name="comment-dots" size={16} color="black" />
                <ItemContentText>31</ItemContentText>
              </ItemContent>
            </Item>
          </ItemList>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Main;
