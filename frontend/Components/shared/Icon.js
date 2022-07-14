import React from 'react';
import IcoMoon, {iconList} from 'react-native-icomoon';
import iconSet from '../../../assets/iconFonts/selection.json';

const Icon = ({name, ...props}) => {
  return <IcoMoon iconSet={iconSet} name={name} {...props} />;
};

export default Icon;
