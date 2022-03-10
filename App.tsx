import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';

export type RootStackParamList = {
  HomeScreen: undefined;
  MapScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {

  return (
    <Provider store={ store }>
      <NavigationContainer>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={ Platform.OS === 'ios' ? 'padding' : 'height' } 
            style={{ flex: 1 }}
            keyboardVerticalOffset={ Platform.OS === 'ios' ? -64 : 0 }
          >
            <Stack.Navigator>
              <Stack.Screen 
                name='HomeScreen' 
                component={ HomeScreen } 
                options={{
                  headerShown: false,
                }} 
              />

              <Stack.Screen 
                name='MapScreen' 
                component={ MapScreen } 
                options={{
                  headerShown: false,
                }} 
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

export default App;

//* https://github.com/FaridSafi/react-native-google-places-autocomplete