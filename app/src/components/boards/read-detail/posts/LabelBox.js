import React, { useContext } from "react";
import { Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

const Container = styled.View`
  flex: 1;
  flex-direction: row;
`;

const ProfileImage = styled.Image.attrs((props) => ({
  source: props.source,
  resizeMode: "cover",
}))`
  height: 52px;
  width: 52px;
  margin: 0 4px 0 4px;
  border-radius: 30px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.boardsButton};
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

const LabelBox = ({ profilePath, nickname, major }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Label>
        <ProfileImage
          source={{
            uri: profilePath,
          }}
        />
        <NameBox>
          <Text style={{ fontSize: 18, fontWeight: "bold", margin: 2 }}>
            {nickname}
          </Text>
          <Text>{major || "정보통신공학과"}</Text>
        </NameBox>
        <Subscribe>
          <Feather name="heart" size={32} color="gray" />
        </Subscribe>
      </Label>
    </Container>
  );
};

export default LabelBox;
