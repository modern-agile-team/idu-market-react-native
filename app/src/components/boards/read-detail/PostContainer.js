import React, { useContext } from "react";
import { Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

import Post from "./posts/Post";
import CommentContainer from "./comments/CommentContainer";

const Container = styled.View``;

const PostContainer = ({ getDateOrTime, detailViewInfo }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <>{detailViewInfo()}</>
      <CommentContainer getDateOrTime={getDateOrTime} />
    </Container>
  );
};

export default PostContainer;
