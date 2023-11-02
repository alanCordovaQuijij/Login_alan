import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/Navigation/StackNavigator';
import { View } from 'react-native-reanimated/lib/typescript/Animated';
import ModalError from './src/components/ModalError';
import { ModalProvider } from './src/context/modalContext';
import Toast from 'react-native-toast-message';
import { toastConfig } from './src/components/Toast';


 const App = () => {
  return (
    <ModalProvider>
      <ModalError/>
      <NavigationContainer>
        <StackNavigator/>
      </NavigationContainer> 
      <Toast config={toastConfig as unknown as any}/>
    </ModalProvider> )
}

export default App;