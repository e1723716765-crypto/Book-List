import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import ListScreen from '../screens/ListScreen';
import AddBookScreen from '../screens/AddBookScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen 
        name="List" 
        component={ListScreen} 
        options={{ title: 'Mi Librería' }} 
      />
      <Stack.Screen 
        name="AddBook" 
        component={AddBookScreen} 
        options={{ title: 'Nuevo Libro' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;