import React, {useContext, useEffect, useReducer, useState} from 'react';
import {Avatar, Chip, Text, TextInput} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {InitialAuthState, authReducer} from '../../store/auth/authReducer';
import {useNavigation} from '@react-navigation/native';
import {
  AuthContexts,
  AuthContextsDispatch,
} from '../../store/auth/authContexts';
import FastImage from 'react-native-fast-image';
import {CardProducts} from '../../components/Products/CardProducts';

export const HomeScreen = () => {
  const authState = useContext(AuthContexts);
  const dispatch = useContext(AuthContextsDispatch);
  const [screenSize] = useState(Dimensions.get('screen'));
  const [categorys, setcategorys] = useState([
    {
      id: '1',
      category: 'Relojes',
      img: 'https://picsum.photos/700',
      color: '#ff7c7e',
    },
    {
      id: '2',
      category: 'Telefonos',
      img: 'https://picsum.photos/700',
      color: '#ff7c7e',
    },
    {
      id: '3',
      category: 'puertas',
      img: 'https://picsum.photos/700',
      color: '#ff7c7e',
    },
    {
      id: '4',
      category: 'muebles',
      img: 'https://picsum.photos/700',
      color: '#ff7c7e',
    },
    {
      id: '5',
      category: 'drogas',
      img: 'https://picsum.photos/700',
      color: '#ff7c7e',
    },
  ]);

  useEffect(() => {
    console.log('Auth state home', authState);
  }, []);

  const Item = () => (
    <View>
      <Text>Hola</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={{backgroundColor: '#f9f9f8', gap: 20, padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#fafafa',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              }}>
              <MaterialIcon name="menu" size={20} color="#ff7c7e" />
            </View>
          </View>
          <View>
            <Text
              style={{
                fontFamily: 'Quan-Black',
                fontSize: 25,
                color: '#2c3645',
              }}>
              Home
            </Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#fafafa',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 100,
              }}>
              <MaterialIcon name="shopping-cart" size={20} color="#ff7c7e" />
            </View>
            <View>
              {authState.user?.photoURL ? (
                <Avatar.Image
                  size={35}
                  source={{uri: authState.user?.photoURL}}
                />
              ) : (
                <Avatar.Text size={35} label={authState.user?.name || 'AN'} />
              )}
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 10,
          }}>
          <View style={{flex: 6}}>
            <TextInput
              mode="outlined"
              placeholder="Buscar"
              style={{width: '100%', height: 40}}
              outlineStyle={{borderRadius: 10, borderColor: '#D9D9D9'}}
              value=""
              right={<TextInput.Icon icon={'magnify'} />}
              // onChangeText={text => setText(text)}
            />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#ff7c7e',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              borderColor: '#D9D9D9',
              borderWidth: 1,
            }}>
            <MaterialIcon name="filter-list-alt" size={20} color="white" />
          </View>
        </View>

        <View
          style={{
            backgroundColor: 'white',
            height: screenSize.height / 6,
            borderRadius: 10,
            padding: 10,
            width: '100%',
            borderColor: '#D9D9D9',
            borderWidth: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 2,
              width: '100%',
              height: '100%',
            }}>
            <View
              style={{
                height: '100%',
                borderRadius: 10,
                width: '30%',
                backgroundColor: 'red',
              }}>
              <Text>hOLA</Text>
            </View>
            <View style={{justifyContent: 'center', width: '55%', padding: 10}}>
              <View>
                <Text
                  numberOfLines={2}
                  style={{color: 'black', fontSize: 14, fontWeight: 'bold'}}>
                  Encuentra lo que necesitas
                </Text>
                <Text
                  numberOfLines={3}
                  style={{fontSize: 12, color: '#a9acb3'}}>
                  Lorem Ipsum es simplemente el texto de relleno de las
                  imprentas y archivos de texto. Lorem Ipsum ha sido el texto de
                  relleno estándar de las industrias desde el año 1500, cuando
                  un impresor (N. del T. persona que se dedica a la imprenta)
                  desconocido usó una galería de textos y los mezcló de tal
                  manera que logró hacer un libro de textos especimen. No sólo
                  sobrevivió 500 años, sino
                </Text>
              </View>
            </View>
            <View style={{width: '100%', justifyContent: 'center'}}>
              <View
                style={{
                  height: 40,
                  backgroundColor: '#ff7c7e',
                  width: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  borderColor: '#D9D9D9',
                  borderWidth: 1,
                }}>
                <MaterialIcon name="shopping-basket" size={20} color="white" />
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={{marginBottom: 15}}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Quan-Black',
              }}>
              Categorias
            </Text>
          </View>
          <ScrollView horizontal>
            <Chip
              style={{
                marginRight: 10,
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                borderColor: '#D9D9D9',
                borderWidth: 1,
              }}
              onPress={() => console.log('Pressed')}>
              Todos
            </Chip>

            {categorys.map(category => (
              <Chip
                style={{
                  marginRight: 10,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  borderRadius: 20,
                  borderColor: '#D9D9D9',
                  borderWidth: 1,
                }}
                onPress={() => console.log('Pressed')}>
                {category.category}
              </Chip>
            ))}
          </ScrollView>
        </View>

        <View>
          <View style={{marginBottom: 15}}>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'Quan-Black',
              }}>
              Top de productos
            </Text>
          </View>

          <View>
            <FlatList
              data={categorys}
              numColumns={2}
              horizontal={false}
              renderItem={({item}) => (
                <View style={{margin: 5, flex: 1}}>
                  <CardProducts />
                </View>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        </View>

        <Text
          onPress={() => {
            auth().signOut();
          }}>
          Cerrar sesion
        </Text>
      </View>
    </ScrollView>
  );
};
