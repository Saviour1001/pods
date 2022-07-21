import {AsyncStorage} from 'react-native';

const storeMyName = async name => {
  try {
    await AsyncStorage.setItem('MyName', name);
  } catch (error) {
    // Error saving data
    console.log('Error Storing name--->', error);
  }
};

getMyName = async () => {
  try {
    const value = await AsyncStorage.getItem('MyName');
    if (value !== null) {
      // We have data!!
      console.log(value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
    console.log('Error Storing name--->', error);
    return false;
  }
};
