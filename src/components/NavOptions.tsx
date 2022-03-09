import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
  {
    id: '123',
    title: 'Get a ride',
    image: 'https://i.imgur.com/LewhnOh.png',
    screen: 'MapScreen'
  },
  {
    id: '456',
    title: 'Order food',
    image: 'https://i.imgur.com/UvzqqY3.png',
    screen: 'EatsScreen'
  }
]

const NavOptions = () => {

  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList 
      data={ data }
      horizontal
      keyExtractor={ ( item ) => item.id }
      renderItem={ ({ item }) => (
        <TouchableOpacity
          onPress={ () => navigation.navigate( item.screen as never ) }
          style={ tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-35`}
          disabled={ !origin }
        >
          <View style={ !origin && tw`opacity-20` }>
            <Image 
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
              source={{ uri: item.image }}
            />
            <Text style={ [tw`mt-2 text-lg font-semibold` ] }>{ item.title }</Text>
            <Icon
              style={ tw`p-2 bg-black rounded-full w-10 mt-4` }
              name="arrowright" 
              color='white'
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavOptions;