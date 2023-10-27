import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {reqPost} from './Api/reqPost';
import {DatosListado} from './Api/Interfaces/reqRespDatos';
import {StackScreenProps} from '@react-navigation/stack';
import {mmkv} from './Login';

interface Props extends StackScreenProps<any, any> {}

export const Post = ({navigation}: Props) => {
  const [datos, setDatos] = useState<DatosListado[]>([]);
  const [favoritos, setFavoritos] = useState<DatosListado[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reqPost.get<DatosListado[]>('/posts');
        mmkv.setMapAsync('Datos', response.data);
        const datosFromStorage = await mmkv.getMapAsync('Datos');
        setDatos(datosFromStorage as DatosListado[]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    
    //console.log('DATOS 3', datos);
  }, [datos]);

  const handleAddFavorito = async (id: number) => {
    try {
      // Obtener la lista de favoritos del almacenamiento
      const favoritosFromStorage = await mmkv.getMapAsync('Favoritos');
      
      // Comprobar si la lista es válida (no null ni undefined)
      if (favoritosFromStorage && Array.isArray(favoritosFromStorage)) {
        const favorito = datos.find(item => item.id === id);
  
        // Verificar si el favorito ya está en la lista
        if (favorito && !favoritosFromStorage.some(fav => fav.id === favorito.id)) {
          // Actualizar la lista de favoritos inmediatamente
          //setFavoritos(prevFavoritos => [...prevFavoritos, favorito]);
  
          // Guardar la nueva lista de favoritos en el almacenamiento
          await mmkv.setMapAsync('Favoritos', [...favoritosFromStorage, favorito]);
        }
      } else {
        console.error('Error al obtener la lista de favoritos del almacenamiento.');
      }
    } catch (error) {
      console.error('Error al manejar la adición de favoritos:', error);
    }
  };
  


  const navegarFavoritos = () => {
    navigation.navigate('FavoritosScreen');
  };

  return (
    <>
      <View style={{backgroundColor: 'gray'}}>
        <FlatList
          data={datos}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                margin: 10,
                backgroundColor: 'yellow',
              }}>
              <View style={{width: '60%', backgroundColor: 'red'}}>
                <Text key={item.id}>{item.title}</Text>
              </View>

              <View style={{backgroundColor: 'green'}}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#147EFB',
                    padding: 15,
                    borderRadius: 15,
                  }}
                  onPress={() => handleAddFavorito(item.id)}>
                  <Text>Añadir a favoritos</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
          <TouchableOpacity
            style={{backgroundColor: 'purple', padding: 15, borderRadius: 15}}
            onPress={navegarFavoritos}>
            <Text>Ir a favoritos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
