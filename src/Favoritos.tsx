import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { DatosListado } from './Api/Interfaces/reqRespDatos';

interface Props extends StackScreenProps<any, any>{}

interface favoritos{
    favoritos: DatosListado[];
}


export const Favoritos = ({navigation, route}:Props) => {
    const params = route.params as favoritos;
    const [favoritosListado, setFavoritosListado] = useState<DatosListado[]>([]);

    
    

    useEffect(() => {
  
        console.log('DATOS FAVORITOS:',route.params)
        setFavoritosListado(params.favoritos)
        console.log('DATOS FAVORITOS:',favoritosListado)
        

    }, [params.favoritos])

    const eliminarFavoritos = (id: number) => {


        console.log('ID ELIMINAR',id)
        setFavoritosListado((prevListado) => prevListado.filter((_,i) => i !== id));



        console.log('LISTA NUEVA:', favoritosListado)
    }

    const eliminarFavoritos2 = (id: number) => {
        setFavoritosListado((prevListado) => {
          const indiceAEliminar = prevListado.findIndex((item) => item.id === id);
      
          if (indiceAEliminar !== -1) {
            const nuevoListado = prevListado.filter((_, i) => i !== indiceAEliminar);
            return nuevoListado;
          } else {
            console.error('Elemento no encontrado para eliminar con el id:', id);
            return prevListado;
          }
        });
      };
    
    
  return (
    <View style={{backgroundColor:'gray', height:'100%'}}>
        <FlatList
        
        data={favoritosListado}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
    
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', width:'100%', margin:10, backgroundColor:'yellow'}}>
                <View style={{width:'60%', backgroundColor:'red'}}>
                    <Text  key={item.id}>{item.title}</Text>
                </View>

                <View style={{backgroundColor:'green', marginHorizontal:20 }}>
                    <TouchableOpacity 
                    style={{ backgroundColor: '#147EFB', padding: 15, borderRadius: 15 }}
                    onPress={() => eliminarFavoritos2(item.id)}
                     >
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            
            </View>

        )}
        
        />

                <View style={{position:'absolute', bottom:20, alignSelf:'center' }}>
                    <TouchableOpacity style={{ backgroundColor: 'purple', padding: 15, borderRadius: 15 }} onPress={()=>navigation.navigate('Posts')} >
                        <Text>Atrás</Text>
                    </TouchableOpacity>
                </View>

    </View>
  )
}
