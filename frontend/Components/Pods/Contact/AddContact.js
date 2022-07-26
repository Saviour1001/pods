import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {ScanQRCode} from '../../../../assets/image';
import {colors} from '../../shared/styles';
import {H3} from '../../shared/Typography';
import GreenButton from '../Common/GreenButton';
import HeaderWithBack from '../Common/HeaderWithBack';
import InputField from '../Common/InputField';

const AddContact = ({navigation: {goBack}}) => {
  const [name, setName] = useState();
  const [walletAddress, setWalletAddress] = useState();

  const handleSubmit = async () => {
    try {
      let input = [{name: name, walletAddress: walletAddress}];
      const myContacts = await AsyncStorage.getItem('myContacts');
      if (myContacts !== null) {
        const temp = JSON.parse(myContacts);
        temp.push({name: name, walletAddress: walletAddress});
        await AsyncStorage.setItem('myContacts', JSON.stringify(temp));
      } else {
        await AsyncStorage.setItem('myContacts', JSON.stringify(input));
        console.log('nai milla');
      }
      goBack();
    } catch (error) {
      // Error retrieving data
      console.log('error hai bhai', error);
    }
  };

  return (
    <View style={{margin: 30}}>
      <HeaderWithBack title="ADD CONTACT" handleBack={() => goBack()} />
      <InputField
        value={walletAddress}
        setvalue={setWalletAddress}
        LabelName="Wallet Address"
        placeholder="Enter wallet address or ENS"
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
