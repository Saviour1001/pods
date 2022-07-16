import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {ScanQRCode} from '../../../../assets/image';
import {colors} from '../../shared/styles';
import {H3} from '../../shared/Typography';
import GreenButton from '../Common/GreenButton';
import HeaderWithBack from '../Common/HeaderWithBack';
import InputField from '../Common/InputField';

const AddContact = ({navigation: {goBack}}) => {
  return (
    <View style={{margin: 30}}>
      <HeaderWithBack title="ADD CONTACT" handleBack={() => goBack()} />
      <InputField
        LabelName="Wallet Address"
        placeholder="Enter wallet address or ENS"
        containerStyle={styles.commonMarginTop}
      />
      <InputField
        LabelName="Name"
        placeholder="Name your contact"
        containerStyle={styles.commonMarginTop}
      />
      <GreenButton label="ADD" buttonStyle={styles.commonMarginTop} />
      <H3 style={{alignSelf: 'center', color: colors.gray, marginVertical: 15}}>
        OR
      </H3>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          backgroundColor: colors.green,
          borderRadius: 25,
          borderWidth: 1,
          borderBottomWidth: 3,
          borderRightWidth: 3,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Image source={ScanQRCode} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  commonMarginTop: {
    marginTop: 30,
  },
});

export default AddContact;
