import React, { useContext } from "react";
import { Text } from "react-native";
import styled, { ThemeContext } from "styled-components/native";

import { UserContext, ProgressContext } from "../../contexts";
import { Input } from "../../components";
import { logout } from "../../utils/firebase";

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

const LoginQuestion = styled.View``;

const LoginQuestionBtnContainer = styled.View`
  flex-direction: row;
`;

const GoLoginScreenButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.boardsButton};
  margin-top: 40px;
  padding: 10px;
  border-radius: 10px;
`;

const Profile = ({ navigation }) => {
  const { dispatch } = useContext(UserContext);
  const { spinner } = useContext(ProgressContext);

  const theme = useContext(ThemeContext);
  const { user } = useContext(UserContext);

  // const user = getCurrentUser();

  const _handleLogoutButtonPress = async () => {
    try {
      spinner.start();
      await logout();
    } catch (e) {
      console.log("[Profile] logout: ", e.message);
    } finally {
      dispatch({});
      spinner.stop();
    }
  };

  return (
    <>
      {user?.user ? (
        <Container>
          <Input label="학번" value="학번" disabled />
          <Input label="학번" value="학번" disabled />
        </Container>
      ) : (
        <Container>
          <LoginQuestion>
            <Text>로그인을 하신 후에 볼 수 있습니다</Text>
            <Text>로그인 하시겠습니까?</Text>
          </LoginQuestion>
          <LoginQuestionBtnContainer>
            <GoLoginScreenButton>
              <Text
                style={{ color: "#fff", fontWeight: "bold" }}
                onPress={() => navigation.navigate("Login")}
              >
                로그인 하러가기
              </Text>
            </GoLoginScreenButton>
          </LoginQuestionBtnContainer>
        </Container>
      )}
    </>
  );
};

export default Profile;
