import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Login } from '../Login';
import { Post } from '../Post';
import { Favoritos } from '../Favoritos';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

export const BottomTab = () => {
    return (
        <Tab.Navigator initialRouteName='Posts' screenOptions={{headerShown:false}} >
            
            <Tab.Screen name='Posts' component={Post} options={{
                tabBarLabel: 'Post',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="database" color={color} size={size} />
                ),
            }}/>


            <Tab.Screen name='FavoritosScreen' component={Favoritos} 
            options={{
                tabBarLabel: 'Favoritos',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="star" color={color} size={size} />
                ),
            }}
            />
        </Tab.Navigator>
      )
}

export default BottomTab