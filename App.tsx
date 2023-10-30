import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/Navigation/StackNavigator';
import { View } from 'react-native-reanimated/lib/typescript/Animated';


 const App = () => {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>  )
}

export default App;