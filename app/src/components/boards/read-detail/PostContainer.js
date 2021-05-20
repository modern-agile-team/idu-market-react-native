import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

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
