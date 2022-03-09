import React from 'react';
import { View } from 'react-native';
import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import tw from 'twrnc';
import { StackScreenProps, createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props extends StackScreenProps<RootStackParamList, 'MapScreen'>{}

const MapScreen = ( {}: Props ) => {

  const Stack = createStackNavigator();

  return (
    <SafeAreaView>
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
            name="RideOptionCard"
            component={ RideOptionsCard }
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </View>
    </SafeAreaView>
  )
}

export default MapScreen;