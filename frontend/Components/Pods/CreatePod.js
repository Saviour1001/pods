import React from 'react';
import { useState } from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import {H2, H3, styles} from '../shared/Typography';
import {colors, fontFamilies, globalStyles} from '../shared/styles';
import InputField from './Common/InputField';
import {
  useMoralisFile,
  useMoralis,
  useWeb3ExecuteFunction,
} from "react-moralis";
import Icon from '../shared/Icon';
import iconNames from '../shared/iconNames';
import HeaderWithBack from './Common/HeaderWithBack';
import BottomButton from './Common/BottomButton';
import ABI from "../../../smartContract/ABIs/podsV1.json";
const contractAddress = "0x1977b8F6c789CbC7AF2bd066842F0fC47Fa583d3";


const CreatePod = ({navigation}) => {
  const {goBack} = navigation;
  const handelFileInput = () => {
    console.log('Please take input files');
  };
  const handelShareWith = () => {
    navigation.navigate('ShareWith');
  };
  const handelCreatePod = () => {
    console.log('Create new pod');
  };

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);


  const { saveFile } = useMoralisFile();
  const { Moralis, account } = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();

  async function uploadFile(file) {
    const imageHash = await saveFile("image",file,{saveIPFS:true}).then((res)=>{ console.log(res); return res; });
  }

  async function createPod() {
    // call uploadFile for each file
    const fileHashes = await Promise.all(files.map(async (file) => {
      return await uploadFile(file);
    }
    ));
    // call createPod
    const options = {
      contractAddress: contractAddress,
      abi: ABI,
      functionName: "createPod",
      params: {
        _contentUri: fileHashes,
        _podMates: [account],
      }
    }

    await contractProcessor.fetch({
      params: options,
    }).then(
      (res) => {
        console.log(res);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
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
