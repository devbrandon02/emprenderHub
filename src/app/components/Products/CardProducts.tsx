import React, {useEffect, useState} from 'react';
import {Dimensions, Text, View} from 'react-native';

export const CardProducts = () => {
  const [screenSize] = useState(Dimensions.get('screen'));

  useEffect(() => {
    console.log('Holaaaaa');
  }, []);

  return (
    <View style={{flex: 1}}>
      <View>
        <View style={{backgroundColor: 'pink', height: 200, borderRadius: 10}}>
          <Text style={{color: 'red'}}>Hola</Text>
        </View>
      </View>
    </View>
  );
};
