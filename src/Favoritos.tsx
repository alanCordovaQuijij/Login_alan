import { StackScreenProps } from '@react-navigation/stack'
import React, { useContext, useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { DatosListado } from './Api/Interfaces/reqRespDatos';
import { mmkv } from './Login';
import { useIsFocused } from '@react-navigation/native';
import { modalContext } from './context/modalContext';
import ConfirmModal from './components/ConfirmModal';

interface Props extends StackScreenProps<any, any>{}

interface favoritos{
    favoritos: DatosListado[];
}



export const Favoritos = ({navigation, route}:Props) => {
    const params = route.params as favoritos;
    const [favoritosListado, setFavoritosListado] = useState<DatosListado[]>([]);

    const [favoritos, setFavoritos] = useState<DatosListado[]>([]);
    const isFocused = useIsFocused();

    const {open, setOpen} = useContext(modalContext);



    const fetchFavoritos = async () => {
      try {
        const favoritosFromStorage = await mmkv.getMapAsync('Favoritos');
        console.log(
          'El listado en la funcion listar FAVORITOS:',
          JSON.stringify(favoritosFromStorage),
        );
        setFavoritos(favoritosFromStorage as DatosListado[]);
      } catch (error) {
        console.error('Error fetching favoritos:', error);
      }
    };

    useEffect(() => {
      fetchFavoritos();
    }, [isFocused]);


      const handleEliminarFavorito = async (id: number) => {
        
        const nuevosFavoritos = favoritos.filter(item => item.id !== id);
        mmkv.removeItem('Favoritos');
        await mmkv.setMapAsync('Favoritos', nuevosFavoritos);
        setFavoritos(nuevosFavoritos);
      };

//////////////////////CONFIRMACION MODAL //////////////////////
  const [modalVisible, setModalVisible] = useState(false);
  const [favoritoAEliminar, setFavoritoAEliminar] = useState<number | null>(null);

  const toggleModal = (id: number) => {
    setFavoritoAEliminar(id);
    setModalVisible(!modalVisible);
  };

  const handleConfirmEliminarFavorito = async () => {
    if (favoritoAEliminar !== null) {
      await handleEliminarFavorito(favoritoAEliminar);
      setModalVisible(false);
    }
  };

  const handleCancelarEliminarFavorito = () => {
    setFavoritoAEliminar(null);
    setModalVisible(false);
  };

////////////////////////////////////////////////////////////////////
  
  return (
    <View style={{backgroundColor:'gray', height:'100%'}}>
      <Image
          className="h-full w-full absolute"
          source={{
            uri: 'https://cdn.pixabay.com/photo/2016/02/13/14/03/roof-1197886_1280.jpg',
          }}
        />
        <FlatList
        
        data={favoritos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
    
            <View 
            style={{
                flexDirection:'row',
                alignItems:'center', 
                justifyContent:'space-between', 
                width:'95%', 
                margin:10, 
                backgroundColor: 'white',
                borderRadius: 10,
                elevation: 10,
                paddingHorizontal: 10,
                alignSelf: 'center',
                }}>

                <View style={{width:'60%'}}>
                    <Text  key={item.id}>{item.title}</Text>
                </View>

                <View style={{ marginHorizontal:20 }}>
                    <TouchableOpacity 
                    style={{ backgroundColor: '#147EFB', padding: 15, borderRadius: 15 }}
                    onPress={() => toggleModal(item.id)}
                     >
                        <Text>Eliminar</Text>
                    </TouchableOpacity>
                </View>
            
            </View>

        )}
        
        />

        <ConfirmModal visible={modalVisible} onConfirm={handleConfirmEliminarFavorito} onCancel={handleCancelarEliminarFavorito} />


                {/* <View style={{position:'absolute', bottom:20, alignSelf:'center' }}>
                    <TouchableOpacity style={{ backgroundColor: 'purple', padding: 15, borderRadius: 15 }} onPress={()=>navigation.navigate('Posts')} >
                        <Text>Atrás</Text>
                    </TouchableOpacity>
                </View> */}
    </View>
  )
}
