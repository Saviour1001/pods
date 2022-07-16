import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {User} from '../../../../assets/image';
import Icon from '../../shared/Icon';
import iconNames from '../../shared/iconNames';
import {colors, globalStyles} from '../../shared/styles';
import {H1, H2, H3, P1, P2} from '../../shared/Typography';
import {contactData} from '../Common/Constant';
import FloatingAddButton from '../Common/FloatingAddButton';

const Contact = ({navigation}) => {
  const Header = () => {
    return (
      <View style={styles.viewContainer}>
        <H2>CONTACTS</H2>

        <TouchableOpacity
          onPress={() => navigation.navigate('YourDetails')}
          style={[
            globalStyles.rowSpaceBetween,
            {width: '100%', marginTop: 50, marginBottom: 30},
          ]}>
          <View style={globalStyles.row}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: 'white',
                borderRadius: 25,
                borderColor: 'black',
                borderWidth: 1,
                borderBottomWidth: 3,
                borderRightWidth: 3,
                marginRight: 20,
                overflow: 'hidden',
              }}>
              <Image
                source={User}
                style={{width: 50, height: 50, alignSelf: 'center'}}
              />
            </View>
            <H2>Manan</H2>
          </View>
          <Icon name={iconNames.chevronRight} size={18} />
        </TouchableOpacity>
      </View>
    );
  };
  const SingleContact = ({item}) => {
    return (
      <View
        style={{
          paddingVertical: 20,
          marginHorizontal: 30,
          borderBottomWidth: 1,
          borderBottomColor: colors.black,
        }}>
        <H3>{item.name}</H3>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <FlatList
        data={contactData}
        renderItem={SingleContact}
        keyExtractor={item => item.id}
      />
      <FloatingAddButton action={() => navigation.navigate('AddContact')} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: colors.lightgreen,
    padding: 30,
    alignItems: 'center',
  },
});

export default Contact;
