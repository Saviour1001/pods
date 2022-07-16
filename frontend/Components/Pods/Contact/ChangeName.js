import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {CopyPast, User} from '../../../../assets/image';
import Icon from '../../shared/Icon';
import iconNames from '../../shared/iconNames';
import {colors, globalStyles} from '../../shared/styles';
import {H3} from '../../shared/Typography';
import BottomButton from '../Common/BottomButton';
import {contactData} from '../Common/Constant';
import HeaderWithBack from '../Common/HeaderWithBack';
import InputField from '../Common/InputField';

const ChangeName = ({navigation: {goBack}}) => {
  return (
    <View style={{margin: 30, flex: 1}}>
      <HeaderWithBack title="NAME" handleBack={() => goBack()} />
      <InputField
        LabelName="Name"
        placeholder="Show Current Name"
        containerStyle={{marginTop: 30}}
      />
      <BottomButton label="CONFIRM" />
    </View>
  );
};

export default ChangeName;
