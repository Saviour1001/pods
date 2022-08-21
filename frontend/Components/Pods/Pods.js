import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  Image,
  FlatList,
} from 'react-native';
import {H1, H2, H3, P1, P2} from '../shared/Typography';
import {colors, globalStyles} from '../shared/styles';
import FloatingAddButton from './Common/FloatingAddButton';
import InputField from './Common/InputField';
import GreenButton from './Common/GreenButton';
import {useMoralisDapp} from '../../providers/MoralisDappProvider/MoralisDappProvider';
import {
  getContent,
  getMyPods,
  getOwner,
  getSharedPods,
} from './helpers/queryPods';
import {useMoralisQuery} from 'react-moralis';
import {Folder} from '../../../assets/image';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Pods = ({navigation}) => {
  const [activeTab, setactiveTab] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const {
    name,
    getName,
    storeName,
    walletAddress,
    setSharedPods,
    setMyPods,
    sharedPods,
    myPods,
  } = useMoralisDapp();
  const [newName, setNewName] = useState(name);
  const {data: tempSharedPods} = useMoralisQuery('PodsCreated', query =>
    query.contains('podMates', '0x4aB65FEb7Dc1644Cabe45e00e918815D3acbFa0a'),
  );
  const {data: tempMyPods} = useMoralisQuery('PodsCreated', query =>
    query.equalTo('podOwner', walletAddress),
  );
  const onPressZero = () => {
    setactiveTab(0);
  };
  const onPressOne = () => {
    setactiveTab(1);
  };
  const handleAdd = () => {
    navigation.navigate('CreatePod', {shareWith: []});
  };
  const handleSudmit = () => {
    storeName({name: newName});
  };
  useEffect(() => {
    getName();
  }, []);
  useEffect(() => {
    if (name === null) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [name]);
  useEffect(() => {
    getSharedPods(tempSharedPods, setSharedPods);
  }, [tempSharedPods]);
  useEffect(() => {
    getMyPods(tempMyPods, setMyPods);
  }, [tempMyPods]);

  const TabBar = () => {
    return (
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={onPressZero}
          style={[styles.tab, activeTab === 0 ? styles.activetab : null]}>
          <H3>Your PODs</H3>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressOne}
          style={[styles.tab, activeTab === 1 ? styles.activetab : null]}>
          <H3>Shared with you</H3>
        </TouchableOpacity>
      </View>
    );
  };
  const PodCard = ({data}) => {
    let podDetails = {
      owner: getOwner({address: data.podOwner, myAddress: walletAddress}),
      title: data.title,
      description: data.description,
      members: data.podMates,
      images: data.images,
      date: data.createdAt,
    };
    const handleCardClick = () => {
      navigation.navigate('PodDetailed', {podDetails});
    };
    return (
      <TouchableOpacity style={styles.podCard} onPress={handleCardClick}>
        <View style={styles.podImage}>
          <Image style={{width: 30, height: 30}} source={Folder} />
        </View>
        <View>
          <H2>{podDetails.title}</H2>
          <P1>By: {podDetails.owner}</P1>
          {/* <P2>harsh, Ketasvi +4 more</P2> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    // This View is imp for Floating button to work properly
    <View style={{flex: 1}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={[
              globalStyles.border,
              {
                width: windowWidth * 0.85,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                paddingVertical: 50,
              },
            ]}>
            <H2>WELCOME TO</H2>
            <H2 style={{fontSize: 35}}>PODs</H2>
            <H3
              style={{
                width: windowWidth * 0.5,
                textAlign: 'center',
                marginTop: 30,
              }}>
              What would you like to be called?
            </H3>
            <InputField
              containerStyle={{width: windowWidth * 0.7}}
              placeholder="Enter your name"
              value={newName}
              setvalue={setNewName}
            />
            <GreenButton
              buttonStyle={{marginTop: 30}}
              label="CONFIRM"
              action={handleSudmit}
            />
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.viewContainer}>
          <H1 style={{marginBottom: 30}}>PODS</H1>
          <TabBar />
          {activeTab === 1 ? (
            <View style={{width: '100%'}}>
              <FlatList
                nestedScrollEnabled
                extraData={sharedPods}
                data={sharedPods}
                onEndReachedThreshold={0.5}
                initialNumToRender={6}
                keyExtractor={item => item.objectId}
                renderItem={({item}) => <PodCard data={item} />}
              />
            </View>
          ) : (
            <View style={{width: '100%'}}>
              <FlatList
                nestedScrollEnabled
                extraData={myPods}
                data={myPods}
                onEndReachedThreshold={0.5}
                initialNumToRender={6}
                keyExtractor={item => item.objectId}
                renderItem={({item}) => <PodCard data={item} />}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <FloatingAddButton action={handleAdd} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 20,
    borderColor: colors.black,
    borderWidth: 1,
  },
  tab: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 20,
  },
  activetab: {
    backgroundColor: colors.primary,
    borderColor: colors.black,
    borderBottomWidth: 2.5,
    borderRightWidth: 3,
    borderWidth: 0.5,
  },
  podCard: {
    width: '100%',
    marginTop: 20,
    borderRadius: 20,
    borderColor: colors.black,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  podImage: {
    width: 90,
    height: 90,
    borderColor: colors.black,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Pods;
