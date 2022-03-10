import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParamList } from '../../App';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { setDestination, setOrigin } from '../slices/navSlice';
import NavFavourites from '../components/NavFavourites';

interface Props extends StackScreenProps<RootStackParamList, 'HomeScreen'>{}

const HomeScreen = ({ navigation }: Props ) => {

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={ tw`bg-white h-full`}>
      <View style={ tw`p-5` }>
        <Image 
          style={{
            width: 80,
            height: 80,
            resizeMode: 'contain'
          }}
          source={{ 
            uri: 'https://i.imgur.com/miaXRpv.png' 
          }}
        />

        <GooglePlacesAutocomplete 
          placeholder='Where from?'
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            }
          }}
          // enablePoweredByContainer={ false }
          onPress={( data, details = null) => {
            dispatch(
              setOrigin({
                location: details!.geometry.location,
                description: data.description
            }))

            dispatch(setDestination(null));
          }}
          minLength={ 2 }
          textInputProps={{ returnKeyType: 'search' }}
          fetchDetails={ true }
          nearbyPlacesAPI='GooglePlacesSearch'
          debounce={ 400 }
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: 'en',
          }}
        />

        <NavOptions />

        <NavFavourites />

      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    color: 'blue'
  }
})