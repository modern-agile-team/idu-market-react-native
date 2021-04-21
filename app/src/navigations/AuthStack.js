import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, Signup, FindPw, FindId } from '../screens';

const Stack = createStackNavigator();

function AuthStack() {
    const theme = useContext(ThemeContext);
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerTitleAlign: 'center',
                cardStyle: {backgroundColor: theme.backgroundColor},
                // 메인화면 헤더 제거
                headerTintColor: theme.headerTintColor,
            }}
        >
            <Stack.Screen name="Login" component={Login} options= {{headerShown: false }} />
            <Stack.Screen name="Signup" component={Signup}
            // 회원가입화면 뒤로가기 버튼 제거 
                options={{ headerBackTitleVisible:false , title: '회원가입'}}
            />
            <Stack.Screen name="FindId" component={FindId} options={{title: '아이디 찾기' }}/>
            <Stack.Screen name="FindPw" component={FindPw} options={{title: '비밀번호 찾기' }}/>
        </Stack.Navigator>
    )
}

export default AuthStack
