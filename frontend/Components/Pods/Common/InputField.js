import React from 'react';
import {View, TextInput} from 'react-native';
import {H2, H3} from '../../shared/Typography';
import {colors, fontFamilies} from '../../shared/styles';
import {onChange} from 'react-native-reanimated';

const InputField = ({
  LabelName,
  value,
  setvalue,
  placeholder,
  containerStyle,
  textInputProps,
  textInputStyles,
}) => {
  return (
    <View style={containerStyle}>
      <H3 style={{color: colors.gray, marginBottom: 15}}>{LabelName}</H3>
      <TextInput
        value={value}
        onChangeText={setvalue}
        placeholder={placeholder}
        placeholderTextColor={colors.gray}
        style={[
          {
            borderColor: colors.black,
            borderWidth: 1,
            borderBottomWidth: 3,
            borderRightWidth: 3,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderRadius: 10,
            fontFamily: fontFamilies.CenturyGothic_BoldItalic,
            fontSize: 16,
            height: 45,
            color: colors.black,
            paddingHorizontal: 15,
            backgroundColor: 'white',
          },
          textInputStyles,
        ]}
        {...textInputProps}
      />
    </View>
  );
};

export default InputField;
