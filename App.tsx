/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useReducer} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthScreen} from './src/app/modules/auth/screens/authScreen';
import 'react-native-gesture-handler';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {HomeScreen} from './src/app/modules/home/homeScreen';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  AuthContexts,
  AuthContextsDispatch,
} from './src/app/store/auth/authContexts';
import {
  AuthActionTypes,
  InitialAuthState,
  authReducer,
} from './src/app/store/auth/authReducer';
import auth from '@react-native-firebase/auth';
import {ToastProvider} from 'react-native-paper-toast';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

function App(): React.JSX.Element {
  const [authState, dispatch] = useReducer(authReducer, InitialAuthState);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      console.log('Cambio de estado', user);

      if (user != null) {
        console.log('Login', user);

        dispatch({
          type: AuthActionTypes.LOGIN,
          payload: {
            user: {
              name: user?.displayName,
              email: user?.email,
              phoneNumber: user?.phoneNumber,
              photoURL: user?.photoURL,
              emailVerified: user?.emailVerified,
              lastSignInTime: user?.metadata.lastSignInTime,
            },
            isAuth: user ? true : false,
            loading: false,
            error: null,
          },
        });
      } else {
        dispatch({
          type: AuthActionTypes.LOGOUT,
          payload: {
            user: null,
            isAuth: false,
            loading: false,
            error: null,
          },
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContexts.Provider value={authState}>
      <AuthContextsDispatch.Provider value={dispatch}>
        <SafeAreaView style={{flex: 1}}>
          <PaperProvider theme={theme}>
            <ToastProvider>
              <NavigationContainer>
                <Stack.Navigator>
                  <Stack.Screen
                    options={{headerShown: false}}
                    name="auth"
                    component={authState.isAuth ? HomeScreen : AuthScreen}
                  />

                  <Stack.Screen
                    options={{headerShown: false}}
                    name="home"
                    component={HomeScreen}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </ToastProvider>
          </PaperProvider>
        </SafeAreaView>
      </AuthContextsDispatch.Provider>
    </AuthContexts.Provider>
  );
}

export default App;
