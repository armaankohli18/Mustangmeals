import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';

import FeedScreen from './src/screens/FeedScreen';
import CampusScreen from './src/screens/CampusScreen';
import EatsScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DetailScreen from './src/screens/DetailScreen';
import WriteReviewScreen from './src/screens/WriteReviewScreen';

const Tab = createBottomTabNavigator();
const EatsStack = createNativeStackNavigator();

function EatsStackScreen() {
  return (
    <EatsStack.Navigator screenOptions={{ headerShown: false }}>
      <EatsStack.Screen name="EatsHome" component={EatsScreen} />
      <EatsStack.Screen name="Detail" component={DetailScreen} />
      <EatsStack.Screen name="WriteReview" component={WriteReviewScreen} />
    </EatsStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#2C5F2E',
          tabBarInactiveTintColor: '#A0A0A0',
          tabBarStyle: {
            borderTopWidth: 0.5,
            borderTopColor: '#E8E8E5',
            paddingBottom: 8,
            paddingTop: 6,
            height: 60,
          },
          tabBarLabel: ({ color }) => {
            const labels = { Feed: 'Feed', Campus: 'Campus', Eats: 'Eats', Profile: 'Profile' };
            return <Text style={{ fontSize: 10, color, fontWeight: '500' }}>{labels[route.name]}</Text>;
          },
          tabBarIcon: ({ color, size }) => {
            const icons = { Feed: '🏠', Campus: '🗺️', Eats: '🍴', Profile: '👤' };
            return <Text style={{ fontSize: 22 }}>{icons[route.name]}</Text>;
          },
        })}
      >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Campus" component={CampusScreen} />
        <Tab.Screen name="Eats" component={EatsStackScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}