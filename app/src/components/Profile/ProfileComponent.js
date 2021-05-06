import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";


const UserInformationContainer = styled.View`
  align-items: flex-start;
  position: absolute;
  top: 0;
  margin-top: 20px;
  width: 100%;
`;


const UserStudentId = styled.View`
`;

const UserEmail = styled.View`
`;

const UserSetting = styled.View`

`;

const ProfileComponent = ({ studentId, Email }) => {
  const theme = useContext(ThemeContext);

  return (
    <UserInformationContainer>
      <UserStudentId><Text>202012123</Text></UserStudentId>
      <UserEmail><Text>202012123@naver.com</Text></UserEmail>
      <UserSetting>
        <Ionicons 
          name="settings-outline" 
          size={24} 
          color={theme.listIcon}
        />
      </UserSetting>
    </UserInformationContainer>
  )
}

export default ProfileComponent;
