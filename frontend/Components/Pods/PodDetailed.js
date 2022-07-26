import React from 'react';
import {View} from 'react-native';
import {colors, globalStyles} from '../shared/styles';
import {H3, P2} from '../shared/Typography';
import HeaderWithBack from './Common/HeaderWithBack';

const PodDetailed = () => {
  return (
    <View>
      <View style={{backgroundColor: colors.primaryLight, padding: 30}}>
        <HeaderWithBack title="POD NAME" />
        <H3 style={{alignSelf: 'center', marginTop: 20, marginBottom: 5}}>
          POD DESCRIPTION POD DESCRIPTION POD DESCRIPTION POD DESCRIPTION
        </H3>
        <View style={globalStyles.rowSpaceBetween}>
          <P2>OWNER</P2>
          <P2>Date</P2>
        </View>
      </View>
    </View>
  );
};

export default PodDetailed;
