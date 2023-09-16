import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {screenConstants} from '../constants';
import {Dashboard} from '../screens';
import {Metrics} from '../theme';
import MyDrawer from './DrawerNavigator';

const RootScreens = () => {
  return <MyDrawer />;
};

export {RootScreens};
