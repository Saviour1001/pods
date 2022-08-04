import React, {useState, useEffect} from 'react';
import {View, FlatList, Dimensions, Image} from 'react-native';
import HeaderWithBack from './Common/HeaderWithBack';
import BottomButton from './Common/BottomButton';
import {colors} from '../shared/styles';
import {H3, P1, P2} from '../shared/Typography';
import {Checked, UnChecked} from '../../../assets/image';
import {TouchableOpacity} from 'react-native';
import {useMoralisDapp} from '../../providers/MoralisDappProvider/MoralisDappProvider';

const windowHeight = Dimensions.get('window').height;

// const [data, setData] = useState(initialState);

const ShareWith = ({navigation}) => {
  const {goBack} = navigation;

  // Adding selected key to data
  const {contacts, getContacts} = useMoralisDapp();
  useEffect(() => {
    getContacts();
  }, []);
  let initData = contacts;
  initData.map(i => {
    i.selected = false;
  });
  const [data, setData] = useState(initData);
  const handleOnPress = item => {
    const newItem = data.map(val => {
      if (val.walletAddress === item.walletAddress) {
        return {...val, selected: !val.selected};
      } else {
        return val;
      }
    });
    setData(newItem);
  };
  const handleSubmit = () => {
    let wallets = [];
    data.map(item => {
      if (item.selected) {
        wallets.push(item.walletAddress);
      }
    });
    navigation.navigate('CreatePod', {shareWith: wallets});
  };

  // TODO Add logic around item.selected
  const SingleContact = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => handleOnPress(item)}
        style={{
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.black,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={item.selected ? Checked : UnChecked}
          style={{marginRight: 10, width: 20, height: 20}}
        />
        <H3>{item.name}</H3>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, padding: 30}}>
      <HeaderWithBack title="SHARE WITH" handleBack={() => goBack()} />
      <View style={{marginTop: 20, height: windowHeight * 0.75}}>
        <FlatList
          data={data}
          renderItem={SingleContact}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <BottomButton label="CONFIRM" action={handleSubmit} />
    </View>
  );
};

export default ShareWith;
