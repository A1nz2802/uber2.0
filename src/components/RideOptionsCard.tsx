import React, { useState } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, FlatList, Image, useWindowDimensions, Platform } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { selectTravelInformation } from '../slices/navSlice';
import { useSelector } from 'react-redux';
import 'intl'
import 'intl/locale-data/jsonp/en-US'

const data = [
  {
    id: 'Uber-X-123',
    title: 'Uber X',
    multiplier: 1,
    image: 'https://i.imgur.com/LewhnOh.png',
  },
  {
    id: 'Uber-XL-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://i.imgur.com/kJhcU2I.png', 
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://i.imgur.com/KRMuzOU.png',
  }
]

// If we hace SURGE pricing, this goes up
const SURGE_CHARGE_RATE: number = 1.5;

interface Item {
  id: string;
  title: string;
  multiplier: number;
  image: string;
}

const RideOptionsCard = () => {

  const navigation = useNavigation();
  const [ selected, setSelected ] = useState<Item | null>( null );
  const { height } = useWindowDimensions();
  const travelTimeInformation = useSelector( selectTravelInformation );

  return (
    <SafeAreaView style={ tw`bg-white flex-grow` }>
      <View>
        <TouchableOpacity 
          style={ tw`absolute top-1 left-5 z-80 p-3 rounded-full` }
          onPress={ () => navigation.navigate('NavigateCard' as never) } 
        >
          <Icon name='chevron-left' type='fontawesome'/>
        </TouchableOpacity>
        <Text style={ tw`text-center py-3 ${ height < 700 ? 'text-base' : 'text-xl'}` }>Select a Ride - { travelTimeInformation?.distance?.text }</Text>
      </View>


      <FlatList 
        data={ data }
        keyExtractor={ item => item.id }
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity 
            style={ tw`flex-row items-center justify-between px-10 ${ id === selected?.id ? "bg-gray-200" : '' } ` }
            onPress={ () => setSelected( item )}
          >
            <Image 
              style={(height < 700) ? { height: 70, width: 70, resizeMode: 'contain' } : { height: 80, width: 80, resizeMode: 'contain'}}
              source={{ uri: image }}
            />

            <View style={ tw`-ml-6` }>
              <Text style={ tw`font-semibold ${ height < 700 ? 'text-base' : 'text-xl'}` }>{ title }</Text>
              <Text>{ (Platform.OS === 'ios') ? travelTimeInformation?.duration?.text : travelTimeInformation?.duration?.text.replace('hours','h') }</Text>
            </View>

            <Text style={ tw`${ height < 700 ? 'text-base' : 'text-xl'}` }>
              {
                ( travelTimeInformation?.duration.value && new 
                  Intl.NumberFormat('en-gb', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(
                    ( travelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier ) / 100
                  )
                )
              }
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={ tw`mt-auto border-t border-gray-200`}>
        <TouchableOpacity 
          style={ tw`bg-black m-3 ${ height < 700 ? 'py-1' : 'py-3'} ${ !selected ? 'bg-gray-300' : '' }` }
          disabled={ !selected }
        >
          <Text style={ tw`text-center text-white ${ height < 700 ? 'text-base' : 'text-xl'}` }>Choose { selected?.title }</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default RideOptionsCard;