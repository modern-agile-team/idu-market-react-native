import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Profile, Main, NoticeBoard, Boards } from '../screens';
import { MaterialIcons } from '@expo/vector-icons'
import { ThemeContext } from 'styled-components';
import { Alert } from 'react-native';

const Tab = createBottomTabNavigator();

const TabBarIcon = ({ focused, name }) => {
  const theme = useContext(ThemeContext);
  return (
    <MaterialIcons
      name={name}
      size={26}
      color={focused ? theme.tabActiveColor : theme.tabInactiveColor}
    />
  );
};
  
const MainTab = ({}) => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.tabActiveColor,
        inactiveTintColor: theme.tabInactiveColor,
        headerShown: false,
      }}
    >
        <Tab.Screen
          name="Idu"
          component={Main}
          options={{
            tabBarIcon: ({ focused }) =>
              TabBarIcon({
                focused,
                name: 'home',
              }),
          }}
        />
        <Tab.Screen
          name="공지"
          component={NoticeBoard}
          options={{
            tabBarIcon: ({ focused }) =>
              TabBarIcon({
                focused,
                name: 'campaign',
              }),
          }}
        />
        <Tab.Screen
          name="프로필"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) =>
              TabBarIcon({
                focused,
                name: focused ? 'person' : 'person-outline',
              }),
          }}
          onPress= {() => {}}
        />
    </Tab.Navigator>
  );
};

export default MainTab;