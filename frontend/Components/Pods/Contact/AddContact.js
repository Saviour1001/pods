import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {ScanQRCode} from '../../../../assets/image';
import {useMoralisDapp} from '../../../providers/MoralisDappProvider/MoralisDappProvider';
import {colors} from '../../shared/styles';
import {H3} from '../../shared/Typography';
import GreenButton from '../Common/GreenButton';
import HeaderWithBack from '../Common/HeaderWithBack';
import InputField from '../Common/InputField';

const AddContact = ({route, navigation}) => {
  const {storeContacts} = useMoralisDapp();
  const {contact} = route.params;
  console.log('Contact from route -->', contact);
  const {goBack} = navigation;
  const [name, setName] = useState(contact?.name);
  const [walletAddress, setWalletAddress] = useState(contact?.walletAddress);

  const handleSubmit = async () => {
    storeContacts({name, walletAddress});
    navigation.navigate('Pods');
  };

  return (
    <View style={{margin: 30}}>
      <HeaderWithBack title="ADD CONTACT" handleBack={() => goBack()} />
      <InputField
        value={walletAddress}
        setvalue={setWalletAddress}
        LabelName="Wallet Address"
        placeholder="Enter wallet address or ENS"
        textInputProps={{multiline: true}}
        containerStyle={styles.commonMarginTop}
      />
      <InputField
        value={name}
        setvalue={setName}
        LabelName="Name"
        placeholder="Name your contact"
        containerStyle={styles.commonMarginTop}
      />
      <GreenButton
        action={handleSubmit}
        label="ADD"
        buttonStyle={styles.commonMarginTop}
      />
      <H3 style={{alignSelf: 'center', color: colors.gray, marginVertical: 15}}>
        OR
      </H3>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          backgroundColor: colors.primary,
          borderRadius: 25,
          borderWidth: 1,
          borderBottomWidth: 3,
          borderRightWidth: 3,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Image source={ScanQRCode} style={{width: 30, height: 30}} />
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
