import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'twrnc';
import NavOptions from '../components/NavOptions';

const HomeScreen = () => {
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

        <NavOptions />

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