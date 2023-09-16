import {createDrawerNavigator} from '@react-navigation/drawer';
import {screenConstants} from '../constants';
import {Dashboard, Inventory} from '../screens';
import {CustomDrawerContent} from './DrawerContent';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName={screenConstants.Dashboard}
      drawerContent={props => (
        <CustomDrawerContent navigation={props.navigation} />
      )}
      screenOptions={{
        // headerShown: false,
        drawerType: 'front',

        swipeEdgeWidth: 0,
      }}>
      <Drawer.Screen name={screenConstants.Dashboard} component={Dashboard} />
      <Drawer.Screen name={screenConstants.Inventory} component={Inventory} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
