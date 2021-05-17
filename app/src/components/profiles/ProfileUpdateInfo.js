import React, { useContext, useState, useEffect, useRef } from "react";
import styled, { ThemeContext } from "styled-components/native";
import { Alert, Text } from "react-native";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import SelectBox from "react-native-multi-selectbox";

import {
  validateEmail,
  removeWhitespace,
  checkNickname,
} from "../../utils/common";
import { Input } from "../../components";
import { getItemFromAsync } from "../../utils/AsyncStorage";
import { ProgressContext, ReadyContext } from "../../contexts";

const Container = styled.View`
  flex: 1;
  align-items: flex-start;
`;

const Title = styled.View`
  align-items: center;
  width: 100%;
`;

const Item = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const UpdateButton = styled.TouchableOpacity`
  padding-left: 10px;
  padding-top: 20px;
`;

const UpdatePost = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 40px;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

const majors = [
  {
    item: "비서학과",
    value: "1",
  },
  {
    item: "관광서비스경영학과",
    value: "2",
  },
  {
    item: "휴먼사회복지학과",
    value: "3",
  },
  {
    item: "비지니스영어과",
    value: "4",
  },
  {
    item: "비즈니스중국어과",
    value: "5",
  },
  {
    item: "비지니스일본어과",
    value: "6",
  },
  {
    item: "세무회계학과",
    value: "7",
  },
  {
    item: "글로벌항공서비스학과",
    value: "8",
  },
  {
    item: "건축학과",
    value: "9",
  },
  {
    item: "토목공학과",
    value: "10",
  },
  {
    item: "실내건축과",
    value: "11",
  },
  {
    item: "디지털산업디자인학과",
    value: "12",
  },
  {
    item: "시각디자인과",
    value: "13",
  },
  {
    item: "주얼리디자인학과",
    value: "14",
  },
  {
    item: "멀티미디어디자인학과",
    value: "15",
  },
  {
    item: "정보통신공학과",
    value: "16",
  },
  {
    item: "리빙세라믹디자인학과",
    value: "17",
  },
  {
    item: "게임/vr디자인학과",
    value: "18",
  },
  {
    item: "방송영상미디어학과",
    value: "19",
  },
  {
    item: "방송뷰티학과",
    value: "20",
  },
  {
    item: "기계자동화학과",
    value: "21",
  },
  {
    item: "컴퓨터전자공학과",
    value: "22",
  },
  {
    item: "산업경영공학과",
    value: "23",
  },
  {
    item: "컴퓨터소프트웨어학과",
    value: "24",
  },
  {
    item: "메카트로닉스공학과",
    value: "25",
  },
  {
    item: "융합기계공학과",
    value: "26",
  },
];

const ProfileUpdateInfo = ({ isNickname, isEmail, major, navigation }) => {
  const [disabled, setDisabled] = useState(true);
  const [profile, setProfile] = useState({});
  const [nickname, setIsNickname] = useState(isNickname);
  const [email, setIsEmail] = useState(isEmail);
  const [majorUpdate, setMajorUpdate] = useState(true);
  const [emailUpdate, setEmailUpdate] = useState(true);
  const [nicknameUpdate, setNicknameUpdate] = useState(true);
  const [selectedMajor, setSelectedMajor] = useState(major);
  const [errorMessage, setErrorMessage] = useState("");

  const theme = useContext(ThemeContext);

  const { readyDispatch } = useContext(ReadyContext);
  const { spinner } = useContext(ProgressContext);

  const didmountRef = useRef();

  const _handleMajorUpdadte = () => {
    setMajorUpdate(false);
  };

  const _handleEmailUpdadteButton = () => {
    setEmailUpdate(false);
  };

  const _handleNicknameUpdadteButton = () => {
    setNicknameUpdate(false);
  };

  const _handleNickname = (nickname) => {
    setIsNickname(removeWhitespace(nickname));
  };

  const _handleEmail = (email) => {
    setIsEmail(removeWhitespace(email));
  };

  function onChange() {
    return (el) => setSelectedMajor(el);
  }

  const _ProfileUpdadte = async () => {
    try {
      spinner.start();
      const config = {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email,
          nickname: nickname,
          major: selectedMajor,
        }),
      };

      const id = await getItemFromAsync("id");
      const response = await fetch(
        `http://13.125.55.135:9800/api/students/${id}`,
        config
      );

      const json = await response.json();
      // console.log(json);
      readyDispatch.notReady();
      json.success ? setProfile(json.profile) : Alert.alert(json.msg);
    } catch (e) {
    } finally {
      // Alert.alert(json.msg);
      spinner.stop();
      navigation.navigate("Main");
    }
  };

  useEffect(() => {
    // 오류메시지가 바로뜨는걸 막는다.
    if (didmountRef.current) {
      let _errorMessage = "";
      if (!checkNickname(nickname)) {
        _errorMessage = "별명은 최대 8글자입니다 (모음,자음 불가)";
      }
      // else if (!validateEmail(email)) {
      // _errorMessage = "이메일 형식을 지켜주세요";
      // }
      else {
        _errorMessage = "";
      }
      setErrorMessage(_errorMessage);
    } else {
      didmountRef.current = true;
    }
  }, [nickname, email]);

  return (
    <Container>
      <Title>
        <Text style={{ fontSize: 25, fontWeight: "bold" }}>프로필 수정</Text>
      </Title>
      <UpdatePost onPress={_ProfileUpdadte}>
        <AntDesign name="checkcircleo" size={30} color="black" />
      </UpdatePost>
      {nicknameUpdate ? (
        <Item>
          <Input
            label="닉네임"
            value={isNickname}
            placeholder={nickname}
            disabled
          />
          <UpdateButton onPress={_handleNicknameUpdadteButton}>
            <FontAwesome5 name="pencil-alt" size={35} color="black" />
          </UpdateButton>
        </Item>
      ) : (
        <Input
          label="닉네임"
          value={nickname}
          onChangeText={_handleNickname}
          placeholder={isNickname}
        />
      )}

      {emailUpdate ? (
        <Item>
          <Input label="이메일" value={isEmail} placeholder={email} disabled />
          <UpdateButton onPress={_handleEmailUpdadteButton}>
            <FontAwesome5 name="pencil-alt" size={35} color="black" />
          </UpdateButton>
        </Item>
      ) : (
        <Input
          label="이메일"
          value={email}
          onChangeText={_handleEmail}
          placeholder={isEmail}
        />
      )}

      {majorUpdate ? (
        <Item>
          <Input label="학과" value={major} placeholder={major} disabled />
          <UpdateButton onPress={_handleMajorUpdadte}>
            <FontAwesome5 name="pencil-alt" size={35} color="black" />
          </UpdateButton>
        </Item>
      ) : (
        <SelectBox
          label="학과"
          options={majors}
          inputPlaceholder="학과"
          value={selectedMajor}
          onChange={onChange()}
          hideInputFilter={false}
        />
      )}
      <ErrorText>{errorMessage}</ErrorText>
    </Container>
  );
};

export default ProfileUpdateInfo;
