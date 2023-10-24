import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { MMKV } from 'react-native-mmkv';

interface Props extends StackScreenProps<any,any>{};

export const mmkv = new MMKV();


export const Login = ({navigation}:Props) => {
    const[usuario, setUsuario] = useState('');
    const[password, setPassword] = useState('');

    


    const handleLogin = () =>{

        if(usuario == 'admin' && password == 'admin') {
            mmkv.set('token', 'Bearer')
        }

        navigation.navigate('Posts')

        console.log('USUARIO:',usuario +' PASSWORD:',password)

    };

  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Inicio de sesión</Text>

        <TextInput
            style = {styles.input}
            placeholder='Usuario'
            value={usuario}
            onChangeText={(text) => setUsuario(text)}
        />

        <TextInput
        style = {styles.input}
        placeholder='Contraseña'
        value={password}
        onChangeText={(text) => setPassword(text)}  
        />

        <TouchableOpacity onPress={handleLogin}>
            <Text style={{color:'black', fontWeight:'bold'}}>Iniciar Sesión</Text>
        </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    titulo: {
        color: 'black',
        fontSize: 24,
        marginBottom: 16,
    },

    input:{
      backgroundColor:'gray',
      width: '80%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingLeft: 8,
      
    }
})


