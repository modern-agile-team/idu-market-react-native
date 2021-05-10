import React from "react";
import styled from "styled-components/native";

import LabelBox from "../../../../components/boards/read-detail/posts/LabelBox";
import ContentTitle from "../../../../components/boards/read-detail/posts/ContentTitle";

const Container = styled.View`
  flex: 1;
`;

const Description = styled.Text`
  padding: 12px;
`;

const Post = ({ board }) => {
  const description = board.content
    .replace(/<p>/gi, "")
    .replace(/<\/p>/gi, "\n");

  return (
    <Container>
      <LabelBox
        profilePath={board.profilePath}
        nickname={board.nickname}
        major={board.major}
      />
      <ContentTitle title={board.title} updateDate={board.updateDate} />
      <Description>{`${description}`}</Description>
    </Container>
  );
};

export default Post;
