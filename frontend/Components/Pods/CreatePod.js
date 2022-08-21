import React, {useState, useEffect} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {H2, H3, styles} from '../shared/Typography';
import {colors, fontFamilies, globalStyles} from '../shared/styles';
import InputField from './Common/InputField';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from '../shared/Icon';
import iconNames from '../shared/iconNames';
import HeaderWithBack from './Common/HeaderWithBack';
import BottomButton from './Common/BottomButton';
import {encode as btoa} from 'base-64';
import {
  useMoralisFile,
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisQuery,
} from 'react-moralis';

import ABI from '../../../smartContract/ABIs/podsV1.json';
import {getSharedPods} from './helpers/queryPods';
const smartContractAddress = '0xF0AAdc224E41388230813172f1E18fdD95C7CF8E';

const CreatePod = ({route, navigation}) => {
  const contractProcessor = useWeb3ExecuteFunction();
  const {shareWith} = route.params;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [URIs, setURIs] = useState([]);
  const {Moralis, account} = useMoralis();
  const {goBack} = navigation;

  const handelFileInput = async () => {
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
  const handleCreatePod = async () => {
    let podMetadata = {
      images: URIs,
      title: title,
      description: description,
    };
    const podMetadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(podMetadata)),
    });
    await podMetadataFile.saveIPFS();
    const podMetadataFileHash = await podMetadataFile.ipfs();
    callingSmartContract({
      contentURI: podMetadataFileHash,
      podMates: shareWith,
    });

    // URIs after calling contract
    setURIs([]);
  };

  async function uploadFile(file) {
    const metadataFile = new Moralis.File('image.jpg', {
      base64: file.data,
    });

    await metadataFile.saveIPFS();
    const metadataHash = await metadataFile.ipfs();
    URIs.push(metadataHash);
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
  async function callingSmartContract({contentURI, podMates}) {
    const options = {
      contractAddress: smartContractAddress,
      functionName: 'createPod',
      abi: ABI,
      params: {
        _contentUri: contentURI,
        _podMates: podMates,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => console.log('NFT created successfully'),
      onError: error => console.log(error),
    });
  }

  return (
    <View style={{flex: 1, padding: 30}}>
      <HeaderWithBack title="CREATE POD" handleBack={() => goBack()} />
      <InputField
        value={title}
        setvalue={setTitle}
        LabelName="Name"
        placeholder="Name your pod"
        containerStyle={{marginTop: 15}}
      />
      <InputField
        value={description}
        setvalue={setDescription}
        LabelName="Description"
        placeholder="One line description"
        containerStyle={{marginTop: 15}}
      />
      <Input label="Share with" action={handelShareWith} />

      <Input label="Files" action={handelFileInput} />
      <BottomButton label="CREATE" action={handleCreatePod} />
    </View>
  );
};

export default CreatePod;
