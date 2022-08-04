import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {H2, H3, styles} from '../shared/Typography';
import {colors, fontFamilies, globalStyles} from '../shared/styles';
import InputField from './Common/InputField';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from '../shared/Icon';
import iconNames from '../shared/iconNames';
import HeaderWithBack from './Common/HeaderWithBack';
import BottomButton from './Common/BottomButton';

import {
  useMoralisFile,
  useMoralis,
  useWeb3ExecuteFunction,
} from 'react-moralis';

const CreatePod = ({route, navigation}) => {
  const {shareWith} = route.params;
  console.log('Share With-->', shareWith);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [URIs, setURIs] = useState([]);
  const {Moralis, account} = useMoralis();
  const {goBack} = navigation;
  const handelFileInput = () => {
    console.log('Please take input files');
    ImagePicker.openPicker({multiple: true, includeBase64: true}).then(
      images => {
        images.map(image => {
          uploadFile(image);
        });
      },
    );
  };

  const handelShareWith = () => {
    navigation.navigate('ShareWith');
  };
  const handelCreatePod = () => {
    console.log('Create new pod');
    let podMetadata = {
      images: URIs,
      title: title,
      description: description,
    };
    const podMetadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(podMetadata)),
    });
    console.log('podMetadataFile-->', podMetadataFile);
  };

  async function uploadFile(file) {
    const metadataFile = new Moralis.File('image.jpg', {
      base64: file.data,
    });

    await metadataFile.saveIPFS();
    const metadataHash = await metadataFile.ipfs();
    URIs.push(metadataHash);
    console.log('URIs-->', URIs);
  }

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
