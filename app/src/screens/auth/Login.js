import React, { useState, useRef, useEffect, useContext } from "react";
import { Alert, Text } from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { ProgressContext, StudentContext } from "../../contexts";
import { Button, Input, FindButton } from "../../components";
import { checkStudent, removeWhitespace } from "../../utils/common";
import { getItemFromAsync, setItemToAsync } from "../../utils/AsyncStorage";

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
  padding: 20px;
`;

const IdPasswordBtn = styled.View`
  background-color: ${({ theme }) => theme.background};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  align-items: flex-start;
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
  line-height: 20px;
  color: ${({ theme }) => theme.errorText};
`;

function Login({ navigation }) {
  const { spinner } = useContext(ProgressContext);
  const { dispatch } = useContext(StudentContext);

  const [student, setStudent] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [disabled, setDisabled] = useState(true);

  // password input focus
  const passwordRef = useRef();

  const _handleStudentChange = (student) => {
    //공백제거 형식체크
    const changedStudent = removeWhitespace(student);
    setStudent(changedStudent);
    setErrorMessage(
      checkStudent(changedStudent) ? "" : "학번 형식을 지켜주세요"
    );
  };

  const _handlePasswordChange = (password) => {
    setPassword(removeWhitespace(password));
  };

  const _handleSuccessLogin = async (json) => {
    setItemToAsync("id", json.id);
    const id = await getItemFromAsync("id");

    dispatch({ id });
    navigation.navigate("Main");
    Alert.alert("로그인에 성공하셨습니다.");
  };

  const _handleLoginButtonPress = async () => {
    try {
      spinner.start();

      const config = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: student,
          psword: password,
        }),
      };

      let response = await fetch("http://13.125.55.135:9800/api/jwt", config);
      let json = await response.json();

      json.success ? _handleSuccessLogin(json) : Alert.alert(json.msg);
    } catch (e) {
      Alert.alert("로그인 실패", e.message);
    } finally {
      spinner.stop();
    }
  };

  useEffect(() => {
    setDisabled(!(password && !errorMessage));
  }, [password, errorMessage]);

  return (
    //키보드 감추기 (인풋 클릭시 키보드가 가리는걸방지)
    <KeyboardAwareScrollView
      contentContainerStyle={{ flex: 1 }}
      extraScrollHeight={20}
    >
      <Container>
        {/* 320p */}
        <Text style={{ fontSize: 40 }}>Idu Market</Text>
        <Input
          label="학번"
          value={student}
          onChangeText={_handleStudentChange}
          onSubmitEditing={_handleLoginButtonPress}
          placeholder="학번"
          returnKeyType="next"
        />
        <Input
          ref={passwordRef}
          label="비밀번호"
          value={password}
          onChangeText={_handlePasswordChange}
          onSubmitEditing={() => {}}
          placeholder="비밀번호"
          returnKeyType="done"
          isPassword
        />
        <ErrorText>{errorMessage}</ErrorText>
        <Button
          title="Login"
          onPress={_handleLoginButtonPress}
          disabled={disabled}
        />
        <Button
          title="회원가입"
          //navigate함수로 원하는 화면의 이름을 전달하여 이동한다.
          onPress={() => navigation.navigate("Signup")}
        />
        <IdPasswordBtn>
          <FindButton
            title="아이디찾기"
            isFilled={false}
            onPress={() => navigation.navigate("FindId")}
          />
          <FindButton
            title="비밀번호찾기"
            isFilled={false}
            onPress={() => navigation.navigate("FindPw")}
          />
        </IdPasswordBtn>
      </Container>
    </KeyboardAwareScrollView>
  );
}

export default Login;
