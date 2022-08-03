import React, {useState} from 'react';
import {View} from 'react-native';
import {useMoralisDapp} from '../../../providers/MoralisDappProvider/MoralisDappProvider';
import BottomButton from '../Common/BottomButton';
import HeaderWithBack from '../Common/HeaderWithBack';
import InputField from '../Common/InputField';

const ChangeName = ({route, navigation}) => {
  const {name, storeName} = useMoralisDapp();
  const {goBack} = navigation;

  const [myName, setMyName] = useState(name);
  console.log(name, myName);
  const handelSubmit = () => {
    storeName({name: myName});
    navigation.navigate('YourDetails');
  };
  return (
    <View style={{margin: 30, flex: 1}}>
      <HeaderWithBack title="NAME" handleBack={() => goBack()} />
      <InputField
        value={myName}
        setvalue={setMyName}
        LabelName="Name"
        placeholder="Show Current Name"
        containerStyle={{marginTop: 30}}
      />
      <BottomButton label="CONFIRM" action={handelSubmit} />
    </View>
  );
};

export default ChangeName;
