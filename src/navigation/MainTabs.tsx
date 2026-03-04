import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

export function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
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
      <Tab.Screen name="Dashboard" component={() => <View></View>} />
      <Tab.Screen name="Tickets" component={() => <View></View>} />
    </Tab.Navigator>
  );
}
