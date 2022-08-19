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
const smartContractAddress = '0xF0AAdc224E41388230813172f1E18fdD95C7CF8E';

const CreatePod = ({route, navigation}) => {
  const contractProcessor = useWeb3ExecuteFunction();
  const {shareWith} = route.params;
  console.log('Share With-->', shareWith);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [URIs, setURIs] = useState([]);
  const {Moralis, account} = useMoralis();
  const {goBack} = navigation;

  // fetching data from the query
  const {data} = useMoralisQuery('AllPods');

  // useEffect(() => {
  //   function extractUri(data) {
  //     const fetchedContent = JSON.parse(JSON.stringify(data, ['contentUri']));
  //     const contentUri = fetchedContent[0]['contentUri'];
  //     return contentUri;
  //   }
  //   async function fetchIPFSDoc(ipfsHash) {
  //     console.log(ipfsHash);
  //     const url = ipfsHash;
  //     const response = await fetch(url);
  //     return await response.json();
  //   }
  //   async function processContent() {
  //     const content = await fetchIPFSDoc(extractUri(data));
  //     console.log('CONTENT', content);
  //   }
  //   if (data.length > 0) {
  //     processContent();
  //   }
  // }, [data]);

  ///////////////////////////////////////

  const handelFileInput = async () => {
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
  const handleCreatePod = async () => {
    console.log('Creating new pod');
    let podMetadata = {
      images: URIs,
      title: title,
      description: description,
    };
    const podMetadataFile = new Moralis.File('metadata.json', {
      base64: btoa(JSON.stringify(podMetadata)),
    });
    console.log('podMetadataFile-->', podMetadataFile);
    await podMetadataFile.saveIPFS();
    const podMetadataFileHash = await podMetadataFile.ipfs();
    console.log('podMetadataFileHash-->', podMetadataFileHash);
    callingSmartContract({
      contentURI: podMetadataFileHash,
      podMates: shareWith,
    });

    // URIs after calling contract
    setURIs([]);
  };

  const handleTest = () => {
    console.log(data);
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
      <BottomButton label="CREATE" action={handleTest} />
    </View>
  );
};

export default CreatePod;
