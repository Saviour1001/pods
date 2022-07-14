import React from 'react';
import {TouchableOpacity} from 'react-native';
import {colors} from '../../shared/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const FloatingAddButton = ({action}) => {
  return (
    <TouchableOpacity
      onPress={action}
      style={{
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.green,
        borderColor: colors.black,
        borderRadius: 25,
        borderWidth: 1,
        borderBottomWidth: 3,
        borderRightWidth: 3,
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 99,
      }}>
      <FontAwesomeIcon icon={faPlus} color={colors.black} size={20} />
    </TouchableOpacity>
  );
};

export default FloatingAddButton;
