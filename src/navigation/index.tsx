import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootScreens} from './AppNavigation';

const Navigation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <RootScreens />
      </NavigationContainer>
    </SafeAreaView>
  );
};

// Navigation Container with Root Navigator routes
export default Navigation;
