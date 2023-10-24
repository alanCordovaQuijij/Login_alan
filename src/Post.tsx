import React, { useEffect, useState } from 'react'
import { Button, FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { reqPost } from './Api/reqPost'
import { DatosListado } from './Api/Interfaces/reqRespDatos';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<any,any>{};

export const Post = ({navigation}:Props) => {

    const [datos, setDatos] = useState<DatosListado[]>([]);
    const [favoritos, setFavoritos] = useState<DatosListado[]>([]);

    useEffect(() => {
      reqPost.get<DatosListado[]>('/posts')
      .then((response) =>{
        console.log('Datos:', response.data)
        setDatos(response.data)

        console.log('DATOS 2', datos)

      })
      .catch(console.log)
     
    }, [])

    useEffect(() => {
        // Este efecto se ejecuta cada vez que 'datos' cambia
        console.log('DATOS 3', datos);
      }, [datos]);
    


   const handleAddFavorito = (id:number) => {
        console.log('ID AÑADIR:', id-1);
        setFavoritos((prevFavoritos) => [...prevFavoritos, datos[id-1]]);
   };

 




   const navegarFavoritos = () => {
    navigation.navigate('FavoritosScreen', {favoritos})
    
   }


  return (
    <>
    <View style={{backgroundColor:'gray', }}>
        <FlatList
        
        data={datos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
    
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', width:'100%', margin:10, backgroundColor:'yellow'}}>
                <View style={{width:'60%', backgroundColor:'red'}}>
                    <Text  key={item.id}>{item.title}</Text>
                </View>

                <View style={{backgroundColor:'green' }}>
                    <TouchableOpacity style={{ backgroundColor: '#147EFB', padding: 15, borderRadius: 15 }} onPress={() => handleAddFavorito(item.id)}>
                        <Text>Añadir a favoritos</Text>
                    </TouchableOpacity>
                </View>
            
            </View>

        )}
        
        />

                <View style={{position:'absolute', bottom:20, alignSelf:'center' }}>
                    <TouchableOpacity style={{ backgroundColor: 'purple', padding: 15, borderRadius: 15 }} onPress={navegarFavoritos}>
                        <Text>Ir a favoritos</Text>
                    </TouchableOpacity>
                </View>

    </View>
    </>
  )
}
