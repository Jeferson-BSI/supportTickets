import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, StyleSheet } from 'react-native';
import SignInScreen from '@features/auth/SignIn/screens/SignIn.view';
import { colors } from '@theme/colors';

const Tab = createBottomTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background.primary },
        tabBarActiveTintColor: '#4361EE',
        tabBarInactiveTintColor: '#6C757D',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E9ECEF',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen name="Dashboard" component={SignInScreen} />
      <Tab.Screen name="Tickets" component={SignInScreen} />
    </Tab.Navigator>
  );
}
