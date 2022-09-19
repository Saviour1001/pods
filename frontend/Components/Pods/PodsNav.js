import React from 'react';
import Contact from './Contact/Contact';
import Pods from './Pods';
import Scan from './Scan/Scan.js';
import Camera from './Camera.js';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Appearance} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCreditCard,
  faCoins,
  faUser,
  faPaperPlane,
  faRocket,
  faHome,
  faQrcode,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import {colors} from '../shared/styles';
const colorScheme = Appearance.getColorScheme();
const Tab = createMaterialBottomTabNavigator();

export default function PodsNav() {
  return (
    <Tab.Navigator
      shifting={false}
      activeColor={colorScheme === 'dark' ? colors.primary: colors.black}
      inactiveColor={colorScheme === 'dark' ? "#3e2465": colors.gray}
      barStyle={{backgroundColor: colorScheme === 'dark' ? 'black' : 'white'}}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, focused}) => {
            return <FontAwesomeIcon icon={faHome} color={color} size={20} />;
          },
        }}
        component={Pods}
      />
      <Tab.Screen
        name="Contact"
        options={{
          tabBarLabel: "Contact",
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faUser} color={color} size={20} />
          ),
        }}
        component={Contact}
      />
      <Tab.Screen
        name="Scan"
        options={{
          tabBarLabel: "Scan",
          tabBarIcon: ({color, focused}) => {
            return <FontAwesomeIcon icon={faQrcode} color={color} size={20} />;
          },
        }}
        component={Scan}
      />
      <Tab.Screen
        name="Camera"
        options={{
          tabBarLabel: "Camera",
          tabBarIcon: ({color, focused}) => {
            return <FontAwesomeIcon icon={faCamera} color={color} size={20} />;
          },
        }}
        component={Camera}
      />
    </Tab.Navigator>
  );
}
