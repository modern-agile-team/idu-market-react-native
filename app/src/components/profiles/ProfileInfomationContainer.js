import React, { useContext, useState, useEffect } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

import { ProgressContext } from "../../contexts";

const Container = styled.View`
  align-items: center;
  margin-top: 20px;
  padding-bottom: 10px;
  width: 100%;
  flex-direction: row;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.listBorder};
`;

const StudentSetting = styled.TouchableOpacity`
  position: absolute;
  right: 20px;
  top: 5px;
`;

const ProfileInformationContainer = ({ profileInfo, navigation }) => {
  const theme = useContext(ThemeContext);

  const { spinner } = useContext(ProgressContext);

  const _handleProfileUpdate = async () => {
    navigation.navigate("ProfileUpdate");
  };

  return (
    <Container>
      <MaterialIcons name="person" size={80} color={theme.listIcon} />
      <>{profileInfo()}</>
      <StudentSetting onPress={_handleProfileUpdate}>
        <Ionicons name="settings-outline" size={24} color={theme.listIcon} />
      </StudentSetting>
    </Container>
  );
};

export default ProfileInformationContainer;
