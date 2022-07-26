import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {colors} from '../../shared/styles';
import {H3} from '../../shared/Typography';

const BottomButton = ({label, action}) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={{
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
        position: 'absolute',
        bottom: 40,
      }}>
      <H3 style={{marginHorizontal: 40}}>{label}</H3>
    </TouchableOpacity>
  );
};

export default BottomButton;
