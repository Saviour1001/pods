import React, {useState} from 'react';
import {View, FlatList, Dimensions, Image} from 'react-native';
import HeaderWithBack from './Common/HeaderWithBack';
import BottomButton from './Common/BottomButton';
import {colors} from '../shared/styles';
import {contactData} from './Common/Constant';
import {H3, P1, P2} from '../shared/Typography';
import {Checked, UnChecked} from '../../../assets/image';
import {TouchableOpacity} from 'react-native';

const windowHeight = Dimensions.get('window').height;

const initData = JSON.parse(JSON.stringify(contactData));

// const [data, setData] = useState(initialState);

const ShareWith = ({navigation}) => {
  const {goBack} = navigation;

  // Adding selected key to data
  initData.map(i => {
    i.selected = false;
  });

  const [data, setData] = useState(initData);
  console.log('data--->', data);
  const handleOnPress = item => {
    const newItem = data.map(val => {
      if (val.id === item.id) {
        return {...val, selected: !val.selected};
      } else {
        return val;
      }
    });
    setData(newItem);
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
        <H3>{item.name}</H3>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{flex: 1, padding: 30}}>
      <HeaderWithBack title="SHARE WITH" handleBack={() => goBack()} />
      <View style={{marginTop: 20, height: windowHeight * 0.75}}>
        <FlatList
          data={contactData}
          renderItem={SingleContact}
          keyExtractor={item => item.id}
        />
      </View>
      <BottomButton label="CONFIRM" />
    </View>
  );
};

export default ShareWith;
