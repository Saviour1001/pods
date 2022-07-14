import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {H2} from '../../shared/Typography';
import {colors, globalStyles} from '../../shared/styles';
import Icon from '../../shared/Icon';
import iconNames from '../../shared/iconNames';

const HeaderWithBack = ({title, handleBack}) => {
  return (
    <View style={globalStyles.rowSpaceBetween}>
      <TouchableOpacity
        onPress={handleBack}
        style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.green,
          borderColor: colors.black,
          borderRadius: 20,
          borderWidth: 1,
          borderBottomWidth: 3,
          borderRightWidth: 3,
          zIndex: 99,
        }}>
        <Icon name={iconNames.chevronLeft} size={16} />
      </TouchableOpacity>
      <H2>{title}</H2>
      {/* This view is placed so that rowSpaceBetween can work properly */}
      <View />
    </View>
  );
};

export default HeaderWithBack;
