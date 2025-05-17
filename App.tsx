import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import NuevaPantalla from './screens/NuevaPantalla';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />
        <Stack.Screen
          name="NuevaPantalla"
          component={NuevaPantalla}
          options={{ title: 'Tareas Pendientes' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
