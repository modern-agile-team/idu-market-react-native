import React, { useContext, useState, useRef, useEffect } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";

import { ProgressContext, ReadyContext } from "../../contexts";
import { getItemFromAsync } from "../../utils/AsyncStorage";
import ProfileUpdateInfo from "../../components/profiles/ProfileUpdateInfo";
import {
  validateEmail,
  removeWhitespace,
  checkNickname,
} from "../../utils/common";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
`;

const TextContainer = styled.View`
  padding: 60px 0px 0px 20px;
`;

function ProfileUpdate({ navigation }) {
  const [profile, setProfile] = useState({});
  const [isReady, setIsReady] = useState(false);

  const { spinner } = useContext(ProgressContext);

  const didmountRef = useRef();

  const _profileInfo = async () => {
    try {
      spinner.start();
      const config = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };
      const id = await getItemFromAsync("id");
      // console.log(id);
      const response = await fetch(
        `http://13.125.55.135:9800/api/students/${id}`,
        config
      );

      const json = await response.json();
      if (json.success) {
        setProfile({ ...profile, ...json.profile });
      } else {
        Alert("서버에서 프로필 정보를 불러올 수 없습니다.");
      }
    } catch (e) {
    } finally {
      spinner.stop();
    }
  };

  const profileUpdateInfo = () => {
    return (
      <ProfileUpdateInfo
        isNickname={profile.nickname}
        isEmail={profile.email}
        major={profile.major}
      />
    );
  };

  if (isReady) {
    return (
      <Container>
        <KeyboardAwareScrollView extraScrollHeight={30}>
          <TextContainer>
            <>{profileUpdateInfo({ navigation })}</>
          </TextContainer>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
  return (
    <AppLoading
      startAsync={_profileInfo}
      onFinish={() => setIsReady(true)}
      onError={console.error}
    />
  );
}

export default ProfileUpdate;
