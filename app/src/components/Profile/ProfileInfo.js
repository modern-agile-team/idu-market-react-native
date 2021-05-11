import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";

const ProfileInfoText = styled.View`
  align-items: flex-start;
  width: 100%;
`;

const StudentId = styled.Text`
  font-weight: bold;
  font-size: 18;
`;

const StudentEmail = styled.Text`
  font-size: 12;
  color: ${({ theme }) => theme.inputPlaceholder};
`;

const ProfileInfo = ({ id, email }) => {
  const theme = useContext(ThemeContext);

  return (
    <ProfileInfoText>
      <StudentId>{id}</StudentId>
      <StudentEmail>{email}</StudentEmail>
    </ProfileInfoText>
  );
};

export default ProfileInfo;
