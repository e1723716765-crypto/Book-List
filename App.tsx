import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigation/AppNavigator';
import { initDatabase } from './app/database/DB';

export default function App() {
  useEffect(() => {
    initDatabase().catch(err => console.error(err));
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}