import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

import Post from "../../../components/boards/read-detail/posts/Post";
import CommentContainer from "../../../components/boards/read-detail/comments/CommentContainer";

const Container = styled.View``;

const PostContainer = ({ getDateOrTime }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Post getDateOrTime={getDateOrTime} />
      <CommentContainer getDateOrTime={getDateOrTime} />
    </Container>
  );
};

export default PostContainer;
