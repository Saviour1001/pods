import React from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {H2, H3, styles} from '../shared/Typography';
import {colors, fontFamilies, globalStyles} from '../shared/styles';
import InputField from './Common/InputField';

import Icon from '../shared/Icon';
import iconNames from '../shared/iconNames';
import HeaderWithBack from './Common/HeaderWithBack';
import BottomButton from './Common/BottomButton';

const CreatePod = ({navigation}) => {
  const {goBack} = navigation;
  const handelFileInput = () => {
    console.log('Please take input files');
  };
  const handelShareWith = () => {
    navigation.navigate('ShareWith');
  };
  const handelCreatePod = () => {
    console.log('Create new pod');
  };

  const Input = ({label, action}) => {
    return (
      <TouchableOpacity
        onPress={action}
        style={[globalStyles.rowSpaceBetween, {marginTop: 30}]}>
        <H3 style={{color: colors.gray}}>{label}</H3>
        <Icon name={iconNames.chevronRight} size={16} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, padding: 30}}>
      <HeaderWithBack title="CREATE POD" handleBack={() => goBack()} />
      <InputField
        LabelName="Name"
        placeholder="Name your pod"
        containerStyle={{marginTop: 15}}
      />
      <InputField
        LabelName="Description"
        placeholder="One line description"
        containerStyle={{marginTop: 15}}
      />
      <Input label="Share with" action={handelShareWith} />
      <Input label="Files" action={handelFileInput} />
      <BottomButton label="CREATE" action={handelCreatePod} />
    </View>
  );
};

export default CreatePod;
