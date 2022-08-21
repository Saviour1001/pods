import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Linking,
} from 'react-native';
import {useMoralisDapp} from '../../providers/MoralisDappProvider/MoralisDappProvider';
import {colors, globalStyles} from '../shared/styles';
import {H3, P2} from '../shared/Typography';
import HeaderWithBack from './Common/HeaderWithBack';
import {checkInContact} from './helpers/queryPods';

const windowWidth = Dimensions.get('window').width;
const PodDetailed = ({route, navigation: {goBack}}) => {
  const {contacts} = useMoralisDapp();
  let tabs = {
    FILES: 'files',
    MEMBERS: 'members',
  };
  const {podDetails} = route.params;
  const {owner, title, description, members, images, date} = podDetails;
  const [currentTab, setCurrentTab] = useState(tabs.FILES);
  const onPressFiles = () => {
    setCurrentTab(tabs.FILES);
  };
  const onPressMembers = () => {
    setCurrentTab(tabs.MEMBERS);
  };

  const TabBar = () => {
    return (
      <View style={styles.tabBar}>
        <TouchableOpacity
          onPress={onPressFiles}
          style={[
            styles.tab,
            currentTab === tabs.FILES ? styles.activetab : null,
          ]}>
          <H3>Files</H3>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onPressMembers}
          style={[
            styles.tab,
            currentTab === tabs.MEMBERS ? styles.activetab : null,
          ]}>
          <H3>Members</H3>
        </TouchableOpacity>
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
            width: windowWidth * 0.3,
            height: 120,
          }}
        />
      </TouchableOpacity>
    );
  };
  const SingleContact = ({item}) => {
    return (
      <View
        style={{
          paddingVertical: 20,
          borderBottomWidth: 1,
          borderBottomColor: colors.black,
        }}>
        <H3>{checkInContact({address: item, contacts})}</H3>
      </View>
    );
  };
  return (
    <View>
      <View style={{backgroundColor: colors.primaryLight, padding: 30}}>
        <HeaderWithBack title={title} handleBack={() => goBack()} />
        <H3 style={{alignSelf: 'center', marginTop: 20, marginBottom: 5}}>
          {description}
        </H3>
        <View style={globalStyles.rowSpaceBetween}>
          <P2>{owner}</P2>
          <P2>{date.substring(0, 10)}</P2>
        </View>
      </View>
      <View style={{padding: 30}}>
        <TabBar />
        {currentTab === tabs.FILES ? (
          <View style={{width: '100%', marginTop: 20}}>
            <FlatList
              key="_"
              numColumns={3}
              style={{flexWrap: 'wrap', flexDirection: 'column'}}
              contentContainerStyle={{
                alignItems: 'flex-start',
              }}
              extraData={images}
              data={images}
              keyExtractor={item => item}
              renderItem={({item}) => <ImageGallery imageUrl={item} />}
            />
          </View>
        ) : (
          <View style={{width: '100%'}}>
            <FlatList
              key="#"
              extraData={members}
              data={members}
              keyExtractor={item => item}
              renderItem={SingleContact}
            />
          </View>
        )}
      </View>
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
  },
});

export default PodDetailed;
