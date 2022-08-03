import React from 'react';
import {View, Image, TouchableOpacity, AsyncStorage} from 'react-native';
import {CopyPast, User} from '../../../../assets/image';
import Icon from '../../shared/Icon';
import iconNames from '../../shared/iconNames';
import {colors, globalStyles} from '../../shared/styles';
import {H3} from '../../shared/Typography';
import HeaderWithBack from '../Common/HeaderWithBack';
import {useMoralisDapp} from '../../../providers/MoralisDappProvider/MoralisDappProvider';

const YourDetails = ({navigation}) => {
  const {walletAddress, name} = useMoralisDapp();

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
          onPress={() => navigation.navigate('ChangeName', {name: name})}
          style={globalStyles.row}>
          <H3 style={{marginRight: 10}}>{name}</H3>
          <Icon name={iconNames.chevronRight} size={16} />
        </TouchableOpacity>
      </View>
      <View style={[globalStyles.rowSpaceBetween, {marginTop: 30}]}>
        <H3 style={{color: colors.gray}}>Wallet Address</H3>

        <TouchableOpacity style={globalStyles.row}>
          <H3 numberOfLines={1} ellipsizeMode="head" style={{marginRight: 10}}>
            {walletAddress.substring(0, 6)}...
            {walletAddress.substring(
              walletAddress.length - 4,
              walletAddress.length,
            )}
          </H3>
          <Image source={CopyPast} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default YourDetails;
