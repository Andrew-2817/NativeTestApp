import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ShiftsScreen from '../screens/ShiftsScreen';
import ShiftDetailScreen from '../screens/ShiftDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Shifts" 
          component={ShiftsScreen}
          options={{ title: 'Available Shifts' }}
        />
        <Stack.Screen 
          name="ShiftDetail" 
          component={ShiftDetailScreen}
          options={{ title: 'Shift Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;