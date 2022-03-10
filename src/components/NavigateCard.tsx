import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { GOOGLE_MAPS_APIKEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { setDestination } from '../slices/navSlice';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import NavFavourites from './NavFavourites';

const NavigateCard = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={ tw`bg-white flex-1` }>
      <Text style={ tw`text-center py-3 text-xl` }>Good Morning, A1nz!</Text>
      <View style={ tw`border-t border-gray-200 flex-shrink` }>
        <View>
          <GooglePlacesAutocomplete
            placeholder='Where to?'
            styles={ toInputBoxStyles }
            nearbyPlacesAPI='GooglePlacesSearch'
            textInputProps={{ returnKeyType: 'search' }}
            minLength={ 2 }
            enablePoweredByContainer={ false }
            fetchDetails={ true }
            debounce={ 400 }
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: 'en',
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details!.geometry.location,
                  description: data.description
                })
              );

              navigation.navigate('RideOptionsCard' as never)
              
            }}
          />
        </View>

        <NavFavourites />

      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 15,
    flex: 0,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  textInput: {
    backgroundColor: '#DDDDDF',
    borderRadius: 0,
    fontSize: 18,
  },
});