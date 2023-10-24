import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Login } from '../Login';
import { Post } from '../Post';
import { Favoritos } from '../Favoritos';


const stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <stack.Navigator initialRouteName='Login'>
        <stack.Screen name='Login' component={Login}/>
        <stack.Screen name='Posts' component={Post}/>
        <stack.Screen name='FavoritosScreen' component={Favoritos}/>

    </stack.Navigator>
  )
}
