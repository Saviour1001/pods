import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {H1, H2, H3, P1, P2} from '../shared/Typography';

const Contact = () => {
  return (
    <View style={styles.viewContainer}>
      <H1>CONTACT</H1>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Contact;
