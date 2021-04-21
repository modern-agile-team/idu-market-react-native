import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Main, Boards, Markets, NoticeBoard } from '../screens';
import MainTab from './MainTab';


const Stack = createStackNavigator();

function MainStack() {
    const theme = useContext(ThemeContext);

    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerTitle: 'IDU',
                headerTintColor: theme.headerTintColor,
                cardStyle: { backgroundColor: theme.backgroundColor},
                headerBackTitleVisible: false,
            }}
        >
            <Stack.Screen name="Main" component={MainTab} />
            <Stack.Screen name="Boards" component={Boards} />
            <Stack.Screen name="Markets" component={Markets} />
        </Stack.Navigator>
    )
}

export default MainStack