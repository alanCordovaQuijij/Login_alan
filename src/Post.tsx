import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {reqPost} from './Api/reqPost';
import {DatosListado} from './Api/Interfaces/reqRespDatos';
import {StackScreenProps} from '@react-navigation/stack';
import {mmkv} from './Login';
import {useIsFocused} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {modalContext} from './context/modalContext';
import Toast from 'react-native-toast-message';

interface Props extends StackScreenProps<any, any> {}

export const Post = ({navigation}: Props) => {
  const [datos, setDatos] = useState<DatosListado[]>([]);
  const [favoritos, setFavoritos] = useState<DatosListado[]>([]);

  const {open, setOpen} = useContext(modalContext);

  const isFocused = useIsFocused();
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reqPost.get<DatosListado[]>('/posts');
        mmkv.setMapAsync('Datos', response.data);
        const datosFromStorage = await mmkv.getMapAsync('Datos');
        setDatos(datosFromStorage as DatosListado[]);

        await mmkv.setMapAsync('Favoritos', favoritos);
        setisLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log('Favoritos en el POST:', JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    ActualizarFavoritos();
  }, [isFocused]);

  const ActualizarFavoritos = async () => {
    const favoritosFromStorage = await mmkv.getMapAsync('Favoritos');
    setFavoritos(favoritosFromStorage as unknown as any);
  };

  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: '¡ Este item ya está añadido a favoritos !',
      //text2: 'This is some something 👋'
    });
  }

  const handleAddFavorito = async (item: DatosListado) => {
    const isFavorite = favoritos.some(favorite => favorite.id === item.id);


    try {
      if (!isFavorite) {
        setFavoritos([...favoritos, item]);
        await mmkv.setMapAsync('Favoritos', [...favoritos, item]);
      } else {
        showToast();
        //setOpen(true)
        await mmkv.setMapAsync('Favoritos', favoritos);
        // Alert.alert("","Este item ya existe...")
      }
    } catch (error) {
      console.error('Error al manejar la adición de favoritos:', error);
    }
  };

  useEffect(() => {
    console.log('Open', open);
    //setOpen(false)
  }, [open]);

  const navegarFavoritos = () => {
    navigation.navigate('FavoritosScreen');
  };

  return (
    <>
      <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          className="h-full w-full absolute"
          source={{
            uri: 'https://cdn.pixabay.com/photo/2017/01/24/03/54/plants-2004492_1280.jpg',
          }}
        />
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={datos}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '95%',
                    margin: 10,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    elevation: 10,
                    paddingHorizontal: 10,
                    alignSelf: 'center',
                  }}>
                  <View style={{width: '50%'}}>
                    <Text key={item.id} className="text-black">
                      {item.title}
                    </Text>
                  </View>

                  <View style={{width: '50%'}}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#147EFB',
                        padding: 15,
                        borderRadius: 15,
                        margin: 10,
                      }}
                      onPress={() => handleAddFavorito(item)}>
                      <Text className="text-center">Añadir a favoritos</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}
            initialNumToRender={20} // Ajusta según tus necesidades
            windowSize={15} // Ajusta según tus necesidades
          />
        )}

        {/* <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
          <TouchableOpacity
            style={{backgroundColor: 'purple', padding: 15, borderRadius: 15}}
            onPress={navegarFavoritos}>
            <Text>Ir a favoritos</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </>
  );
};
