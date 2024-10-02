import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {mobileW} from '../components/Colorsfont';
import Drawerscreen from '../drawer/Drawerscreen';
const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        gestureEnabled: false,
        drawerPosition: 'right',
        drawerStyle: {
          width: (mobileW * 80) / 100,
        },
      }}
      initialRouteName="HomeScreen"
      drawerContent={props => <Drawerscreen {...props} />}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Drawer.Navigator>
  );
}
const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        statusBarColor: 'white',
        statusBarStyle: 'dark',
        statusBarTranslucent: true,
      }}
      initialRouteName="SplashScreen">
      <Stack.Screen
        name="HomeScreen"
        component={MyDrawer}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackNavigator;
