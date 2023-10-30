import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Login } from '../Login';
import { Post } from '../Post';
import { Favoritos } from '../Favoritos';
import BottomTab from './BottomTab';


const stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
        <stack.Screen name='Login' component={Login}/>
        <stack.Screen name='Tabs' component={BottomTab}/>
        
    </stack.Navigator>
  )
}
