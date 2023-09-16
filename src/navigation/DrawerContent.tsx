import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {screenConstants} from '../constants';
import {RootState} from '../redux';
import style from './style';

const CustomDrawerContent = ({navigation}) => {
  const inventoryTypes = useSelector(
    (state: RootState) => state.Inventory?.inventoryTypes,
  );

  return (
    <View style={style.mainContainer}>
      <TouchableOpacity
        style={style.drawerItem}
        onPress={() => navigation.navigate(screenConstants.Dashboard)}>
        <Text style={style.drawerItemText}>{screenConstants.Dashboard}</Text>
      </TouchableOpacity>
      {inventoryTypes.map((it, index) => (
        <TouchableOpacity
          key={index}
          style={style.drawerItem}
          onPress={() =>
            navigation.navigate(screenConstants.Inventory, {
              inventoryCanvas: {inventoryTypeFilter: it.id},
              title: it.inventoryType,
            })
          }>
          <Text style={style.drawerItemText}>{it.inventoryType}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export {CustomDrawerContent};
