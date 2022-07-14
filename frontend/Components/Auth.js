import React, {useState, createRef, useRef, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Linking,
  Animated,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
  ActivityIndicator,
} from 'react-native-paper';

import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from 'react-moralis';
import {useWalletConnect} from '../WalletConnect';
import LottieView from 'lottie-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Animation from '../splashLottie.json';
import {colors} from './shared/styles';
import {H3} from './shared/Typography';
import LinearGradient from 'react-native-linear-gradient';

// import Loader from './Components/Loader';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Auth = ({navigation}) => {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const passwordInputRef = createRef();

  const handleCryptoLogin = () => {
    authenticate({connector})
      .then(() => {
        if (authError) {
          setErrortext(authError.message);
          setVisible(true);
        } else {
          if (isAuthenticated) {
            navigation.replace('Pods');
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    isAuthenticated && navigation.replace('Pods');
  }, [isAuthenticated]);

  return (
    <Provider>
      <View style={styles.mainBody}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={{flex: 1}}>
            <LinearGradient
              colors={['rgba(206, 255, 103, 0.3)', 'rgba(147, 130, 252, 0.3)']}>
              <KeyboardAvoidingView enabled>
                <View>
                  {authError && (
                    <Portal>
                      <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>Authentication error:</Dialog.Title>
                        <Dialog.Content>
                          <Paragraph>
                            {authError ? authError.message : ''}
                          </Paragraph>
                        </Dialog.Content>
                        <Dialog.Actions>
                          <Button onPress={hideDialog}>Done</Button>
                        </Dialog.Actions>
                      </Dialog>
                    </Portal>
                  )}
                  {isAuthenticating && (
                    <ActivityIndicator animating={true} color={'white'} />
                  )}
                </View>

                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={handleCryptoLogin}>
                  <H3>CONNECT YOUR WALLET</H3>
                </TouchableOpacity>
                {/* <Text
                style={styles.registerTextStyle}
                onPress={() =>
                  Linking.openURL('https://ethereum.org/en/wallets/')
                }>
                What are wallets?
            </Text> */}
              </KeyboardAvoidingView>
            </LinearGradient>
          </View>
        </ScrollView>
      </View>
    </Provider>
  );
};
export default Auth;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    color: colors.black,
    borderColor: colors.black,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginLeft: 35,
    marginRight: 35,
    marginTop: windowHeight * 0.8,
    marginBottom: windowHeight * 0.2,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});
