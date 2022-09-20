import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Linking,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {colors} from '../shared/styles';
import {H2, H3} from '../shared/Typography';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCamera, faImages, faUpload} from '@fortawesome/free-solid-svg-icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  useMoralisFile,
  useMoralis,
  useWeb3ExecuteFunction,
  useMoralisQuery,
} from 'react-moralis';
import mintingNFTContractABI from "../../../smartContract/ABIs/minter.json";
const includeExtra = true;

const windowWidth = Dimensions.get('window').width;
const mintingNFTContractAddress = "0x74Fd20EA4C0D0250dCA622df7638aFde0Cb96463";


const Camera = () => {
  const {Moralis, account} = useMoralis();
  const contractProcessor = useWeb3ExecuteFunction();
  const [nftName, setNftName] = useState('Something');
  const [nftDescription, setNftDescription] = useState('something');

  async function uploadFile(file) {
    console.log(typeof file);
    // var jezzon = JSON.parse(file);
    console.log('Uppppppploading to Hadron Collider server!!!');
    const imageFile = new Moralis.File('Diablo.jpg', {
      base64: file.assets[0].base64,
    });

    await imageFile.saveIPFS();
    const imageHash = await imageFile.ipfs();
    console.log(imageHash);
    setImages([...images, imageHash]);
    console.log('$$$', images);

    const metadata = {
      name: nftName,
      description: nftDescription,
      image: imageHash,
    }
    const metadataFile = new Moralis.File("metadata.json", {
      base64: btoa(JSON.stringify(metadata)),
    });

    await metadataFile.saveIPFS();
    const metadataHash = await metadataFile.ipfs();
    callingSmartContract(metadataHash);

  }

  async function callingSmartContract(metadataHash){
    const options = {
      contractAddress: mintingNFTContractAddress,
      abi: mintingNFTContractABI,
      functionName: "createToken",
      params:{
        tokenURI: metadataHash,
      }
    }
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => console.log('NFT created successfully'),
      onError: error => console.log(error),
    })
  }

  const [response, setResponse] = useState(null);
  const [images, setImages] = useState([]);
  //   const actions = [
  //     {
  //       title: 'Take Image',
  //       type: 'capture',
  //       options: {
  //         saveToPhotos: true,
  //         mediaType: 'photo',
  //         includeBase64: false,
  //         includeExtra,
  //       },
  //     },
  //     {
  //       title: 'Select Image',
  //       type: 'library',
  //       options: {
  //         selectionLimit: 0,
  //         mediaType: 'photo',
  //         includeBase64: false,
  //         includeExtra,
  //       },
  //     },
  //     {
  //       title: 'Take Video',
  //       type: 'capture',
  //       options: {
  //         saveToPhotos: true,
  //         mediaType: 'video',
  //         includeExtra,
  //       },
  //     },
  //     {
  //       title: 'Select Video',
  //       type: 'library',
  //       options: {
  //         selectionLimit: 0,
  //         mediaType: 'video',
  //         includeExtra,
  //       },
  //     },
  //     {
  //       title: `Select Image or Video\n(mixed)`,
  //       type: 'library',
  //       options: {
  //         selectionLimit: 0,
  //         mediaType: 'mixed',
  //         includeExtra,
  //       },
  //     },
  //   ];
  const onButtonPress = React.useCallback((type, options) => {
    if (type === 'capture') {
      launchCamera(options, setResponse).then(response => {uploadFile(response)});
    } else {
      launchImageLibrary(options, setResponse).then(response => {uploadFile(response)});
    }
  }, []);
  return (
    <View style={styles.viewContainer}>
      <View style={styles.colContainer}>
        <H2>INSTANT NFT MINTER</H2>
        <View style={{height: 5}}></View>
        <View style={styles.moonContainer}>
          <TouchableOpacity
            onPress={() =>
              onButtonPress('capture', {
                saveToPhotos: true,
                mediaType: 'photo',
                includeBase64: true,
                includeExtra,
              })
            }
            style={styles.button}>
            <FontAwesomeIcon icon={faCamera} size={30} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              onButtonPress('selector', {
                saveToPhotos: true,
                mediaType: 'photo',
                includeBase64: true,
                includeExtra,
              })
            }
            style={styles.button}>
            <FontAwesomeIcon icon={faImages} size={30} color={colors.white} />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          onPress={() => uploadFile(response)}
          style={styles.buttonStyle}>
          <H3>Mint Image as NFT</H3>
        </TouchableOpacity> */}
      </View>
      <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
        <FlatList
          key="_"
          numColumns={3}
          style={{flexWrap: 'wrap', flexDirection: 'row'}}
          contentContainerStyle={{
            alignItems: 'flex-start',
            justifyContent: 'space-evenly',
          }}
          extraData={images}
          data={images}
          keyExtractor={item => item}
          renderItem={({item}) => <ImageGallery imageUrl={item} />}
          
        />
      </View>
    </View>
  );
};

const ImageGallery = ({imageUrl}) => {
  return (
    <TouchableOpacity onPress={() => Linking.openURL(imageUrl)}>
      <Image
        resizeMode="contain"
        source={{uri: imageUrl}}
        style={{
          borderColor: 'black',
          borderWidth: 1,
          width: windowWidth * 0.33,
          height: 120,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  colContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column',
    backgroundColor: colors.primaryLight,
    padding: 20,
  },
  moonContainer: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    height: '30%',
    width: '100%',
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    color: '#fff',
    borderColor: colors.black,
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    borderRadius: 20,
    paddingHorizontal: 20,
  },
});

export default Camera;
