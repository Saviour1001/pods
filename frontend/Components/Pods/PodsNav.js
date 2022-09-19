import React from 'react';
import Contact from './Contact/Contact';
import Pods from './Pods';
import Scan from './Scan/Scan.js';
import Camera from './Camera.js';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

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

const Tab = createMaterialBottomTabNavigator();

export default function PodsNav() {
  return (
    <Tab.Navigator
      shifting={false}
      activeColor={colors.black}
      // inactiveColor="#3e2465"
      barStyle={{backgroundColor: 'white'}}>
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: null,
          tabBarIcon: ({color, focused}) => {
            return <FontAwesomeIcon icon={faHome} color={color} size={20} />;
          },
        }}
        component={Pods}
      />
      <Tab.Screen
        name="Contact"
        options={{
          tabBarLabel: null,
          tabBarIcon: ({color}) => (
            <FontAwesomeIcon icon={faUser} color={color} size={20} />
          ),
        }}
        component={Contact}
      />
      <Tab.Screen
        name="Scan"
        options={{
          tabBarLabel: null,
          tabBarIcon: ({color, focused}) => {
            return <FontAwesomeIcon icon={faQrcode} color={color} size={20} />;
          },
        }}
        component={Scan}
      />
      <Tab.Screen
        name="Camera"
        options={{
          tabBarLabel: null,
          tabBarIcon: ({color, focused}) => {
            return <FontAwesomeIcon icon={faCamera} color={color} size={20} />;
          },
        }}
        component={Camera}
      />
    </Tab.Navigator>
  );
}
