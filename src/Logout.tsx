import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { mmkv } from './Login';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any, any> {}

export const Logout = ({navigation}: Props) => {

    const handleLogout = () => {
        mmkv.removeItem('Token')
        navigation.navigate('Login');
      };
    
  
      return (
        <View style={styles.container}>
          <MaterialCommunityIcons name="logout" size={100} color="#2196F3" />
          <Text style={styles.title}>¿Cerrar sesión?</Text>
          <Text style={styles.subtitle}>Estás a punto de cerrar sesión. ¿Estás seguro?</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      );
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    subtitle: {
      textAlign: 'center',
      color: '#666',
      marginBottom: 20,
    },
    logoutButton: {
      backgroundColor: '#2196F3',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });