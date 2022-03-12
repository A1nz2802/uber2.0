import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import tw from 'twrnc';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

export type MapStackParamList = {
  NavigateCard: undefined;
  RideOptionsCard: undefined;
};

const Stack = createStackNavigator<MapStackParamList>();

const MapScreen = ( ) => {

  const navigation = useNavigation();

  return (
    <View>
      
      <TouchableOpacity 
        style={ tw`bg-gray-100 absolute top-16 left-8 z-50 p-3 rounded-full shadow-lg`}
        onPress={ () => navigation.navigate('HomeScreen' as never) }
      >
        <Icon name="menu" />
      </TouchableOpacity>

      <View style={ tw`h-1/2` }>
        <Map />
      </View>
      
      <View style={ tw`h-1/2` }>
        <Stack.Navigator>
          <Stack.Screen 
            name="NavigateCard"
            component={ NavigateCard }
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen 
            name="RideOptionsCard"
            component={ RideOptionsCard }
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>

    </View>
  )
}

export default MapScreen;