import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { DatosListado } from './Api/Interfaces/reqRespDatos';
import { mmkv } from './Login';

interface Props extends StackScreenProps<any, any>{}

interface favoritos{
    favoritos: DatosListado[];
}


export const Favoritos = ({navigation, route}:Props) => {
    const params = route.params as favoritos;
    const [favoritosListado, setFavoritosListado] = useState<DatosListado[]>([]);

    
    

    const [favoritos, setFavoritos] = useState<DatosListado[]>([]);

    useEffect(() => {
      const fetchFavoritos = async () => {
        try {
          const favoritosFromStorage = await mmkv.getMapAsync('Favoritos');
          setFavoritos(favoritosFromStorage as DatosListado[]);
        } catch (error) {
          console.error('Error fetching favoritos:', error);
        }
      };
  
      fetchFavoritos();
    }, []);


    const handleEliminarFavorito = async (id: number) => {
        
        const nuevosFavoritos = favoritos.filter(item => item.id !== id);
        setFavoritos(nuevosFavoritos);
        mmkv.removeItem('Favoritos');
        await mmkv.setMapAsync('Favoritos', nuevosFavoritos);
      };


    
    
  return (
    <View style={{backgroundColor:'gray', height:'100%'}}>
        <FlatList
        
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
    
            <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between', width:'100%', margin:10, backgroundColor:'yellow'}}>
                <View style={{width:'60%', backgroundColor:'red'}}>
                    <Text  key={item.id}>{item.title}</Text>
                </View>

                <View style={{backgroundColor:'green', marginHorizontal:20 }}>
                    <TouchableOpacity 
                    style={{ backgroundColor: '#147EFB', padding: 15, borderRadius: 15 }}
                    onPress={() => handleEliminarFavorito(item.id)}
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
