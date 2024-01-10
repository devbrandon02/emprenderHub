import React, {memo, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Text} from 'react-native-paper';
import {SocialMediaButtons} from '../components/SocialMediaButtons';
import FastImage from 'react-native-fast-image';

export const AuthScreen = memo(() => {
  const [screenSize] = useState(Dimensions.get('screen'));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20,
        padding: 20,
        backgroundColor: 'white',
      }}>
      <View>
        <Text
          style={{
            fontFamily: 'Quan-Black',
            fontSize: 30,
            textAlign: 'center',
            color: '#2c3645',
          }}>
          ¡Explora y Conecta!
        </Text>

        <View>
          <Text style={{textAlign: 'center', color: '#a9acb3'}}>
            Bienvenido de nuevo. Conéctate y disfruta de una experiencia de
            compra segura y fácil. Explora, elige y compra con confianza.
          </Text>
        </View>
      </View>

      <View
        style={{
          height: screenSize.height / 2,
          width: '100%',
        }}>
        <FastImage
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode={FastImage.resizeMode.cover}
          source={require('../../../../../assets/images/home_image.jpg')}
        />
      </View>

      <View style={{width: '100%'}}>
        <SocialMediaButtons />
      </View>
    </View>
  );
});
