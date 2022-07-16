import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {CopyPast, User} from '../../../../assets/image';
import Icon from '../../shared/Icon';
import iconNames from '../../shared/iconNames';
import {colors, globalStyles} from '../../shared/styles';
import {H3} from '../../shared/Typography';
import {contactData} from '../Common/Constant';
import HeaderWithBack from '../Common/HeaderWithBack';

const YourDetails = ({navigation}) => {
  const {goBack} = navigation;
  return (
    <View style={{margin: 30}}>
      <HeaderWithBack title="PROFILE" handleBack={() => goBack()} />
      <View
        style={{
          width: 80,
          height: 80,
          backgroundColor: 'white',
          borderRadius: 40,
          borderColor: 'black',
          borderWidth: 1,
          borderBottomWidth: 3,
          borderRightWidth: 3,
          marginRight: 20,
          overflow: 'hidden',
          alignSelf: 'center',
          marginTop: 50,
        }}>
        <Image
          source={User}
          style={{width: 80, height: 80, alignSelf: 'center'}}
        />
      </View>
      <View style={[globalStyles.rowSpaceBetween, {marginTop: 50}]}>
        <H3 style={{color: colors.gray}}>Name</H3>
        <TouchableOpacity
          onPress={() => navigation.navigate('ChangeName')}
          style={globalStyles.row}>
          <H3 style={{marginRight: 10}}>Manan</H3>
          <Icon name={iconNames.chevronRight} size={16} />
        </TouchableOpacity>
      </View>
      <View style={[globalStyles.rowSpaceBetween, {marginTop: 30}]}>
        <H3 style={{color: colors.gray}}>Wallet Address</H3>

        <TouchableOpacity style={globalStyles.row}>
          <H3 numberOfLines={1} ellipsizeMode="head" style={{marginRight: 10}}>
            {contactData[0].walletAddress.substring(0, 6)}...
            {contactData[0].walletAddress.substring(
              contactData[0].walletAddress.length - 4,
              contactData[0].walletAddress.length,
            )}
          </H3>
          <Image source={CopyPast} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default YourDetails;
