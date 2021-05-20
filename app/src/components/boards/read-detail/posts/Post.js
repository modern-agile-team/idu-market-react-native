import React, { useContext } from "react";
import { Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

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

const Subscribe = styled.View`
  padding: 10px;
`;

const ContentTitle = styled.View`
  padding: 12px;
`;

const Title = styled.Text``;

const Description = styled.Text`
  padding: 12px;
`;

const Post = ({
  getDateOrTime,
  title,
  nickname,
  content,
  inDate,
  profilePath,
  studentId,
}) => {
  const theme = useContext(ThemeContext);

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
          <Subscribe>
            <Feather name="heart" size={32} color="gray" />
          </Subscribe>
        </Label>
      </LabelBox>

      <ContentTitle>
        <Title
          style={{ fontSize: 25, fontFamily: "sans-serif", fontWeight: "bold" }}
        >
          {title}
        </Title>
        <Text style={{ fontSize: 12, color: "gray" }}>{inDate}</Text>
      </ContentTitle>

      <Description>{content}</Description>
    </Container>
  );
};

export default Post;
