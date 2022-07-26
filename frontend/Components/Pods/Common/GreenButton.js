import React from 'react';
import {TouchableOpacity} from 'react-native';
import {colors} from '../../shared/styles';
import {H3} from '../../shared/Typography';

const GreenButton = ({label, action, buttonStyle, labelStyle}) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={[
        {
          backgroundColor: colors.primary,
          borderWidth: 1,
          borderBottomWidth: 3,
          borderRightWidth: 3,
          borderColor: colors.black,
          borderRadius: 20,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        },
        buttonStyle,
      ]}>
      <H3 style={[{marginHorizontal: 40}, labelStyle]}>{label}</H3>
    </TouchableOpacity>
  );
};

export default GreenButton;
