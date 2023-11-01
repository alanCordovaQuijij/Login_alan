import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/Navigation/StackNavigator';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import ModalError from './src/components/ModalError';
import { ModalProvider } from './src/context/modalContext';
import Toast from 'react-native-toast-message';


 const App = () => {
  return (
    <ModalProvider>
      <ModalError/>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer> 
      <Toast />
    </ModalProvider> )
}

export default App;