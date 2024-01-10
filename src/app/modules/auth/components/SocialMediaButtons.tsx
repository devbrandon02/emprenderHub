import React, {useEffect, useReducer} from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {Text, Button} from 'react-native-paper';
import {
  AuthActionTypes,
  InitialAuthState,
  authReducer,
} from '../../../store/auth/authReducer';
import {useToast} from 'react-native-paper-toast';

export const SocialMediaButtons = () => {
  const [authState, dispatch] = useReducer(authReducer, InitialAuthState);
  const toaster = useToast();

  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      dispatch({
        type: AuthActionTypes.SET_LOADING,
        payload: {
          loading: true,
        },
      });
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
      dispatch({
        type: AuthActionTypes.SET_LOADING,
        payload: {
          loading: false,
        },
      });
      toaster.show({
        message: 'Login successful',
        duration: 2000,
        type: 'success',
      });
    } catch (error) {
      dispatch({
        type: AuthActionTypes.SET_ERROR,
        payload: {
          error: 'Error al iniciar sesión con google',
        },
      });
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '78075596629-324l46v2m66c4mujgo9763c0ofs6tg86.apps.googleusercontent.com',
    });
  }, []);

  return (
    <>
      <View
        style={{
          gap: 40,
        }}>
        <View style={{gap: 10}}>
          <View>
            <Button
              icon={'google'}
              textColor="white"
              compact={true}
              loading={authState.loading}
              disabled={authState.loading}
              onPress={onGoogleButtonPress}
              buttonColor="#4285f4"
              style={{borderRadius: 8}}
              mode="elevated">
              Continuar con google
            </Button>
          </View>

          <View>
            <Button
              icon={'email'}
              compact={true}
              loading={authState.loading}
              disabled={authState.loading}
              textColor="white"
              onPress={() => console.log('Pressed')}
              buttonColor="#e70123"
              style={{borderRadius: 8}}
              mode="elevated">
              Iniciar sesión con Email
            </Button>
          </View>
          <View>
            <Text style={{color: 'red', textAlign: 'center'}}>
              {authState.error}
            </Text>
          </View>
        </View>
        <View>
          <Button
            icon={'form-select'}
            textColor="#2c3645"
            compact={true}
            style={{borderRadius: 8}}
            onPress={() => console.log('Pressed')}
            buttonColor="white"
            mode="text">
            Únete Ahora
          </Button>
        </View>
      </View>
    </>
  );
};
