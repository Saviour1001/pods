import React, {useEffect, useMemo, useState} from 'react';
import {useMoralis} from 'react-moralis';
import MoralisDappContext from './context';
import AsyncStorage from '@react-native-async-storage/async-storage';

function MoralisDappProvider({children}) {
  const {web3, Moralis, user} = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();

  const [name, setName] = useState(null);
  const [contacts, setContacts] = useState([]);
  const getName = async () => {
    try {
      const value = await AsyncStorage.getItem('myName');
      if (value !== null) {
        // We have data!!
        setName(value);
        console.log('User Ka naam-->', name);
      } else {
        console.log('naam nai milla');
      }
    } catch (error) {
      // Error retrieving data
      console.log('naam lane mai error hai bhai', error);
    }
  };
  const storeName = async ({name}) => {
    try {
      await AsyncStorage.setItem('myName', name);
      getName();
    } catch (error) {
      // Error saving data
      console.log('storeName ka error,', error);
    }
  };
  const getContacts = async () => {
    try {
      const value = await AsyncStorage.getItem('myContacts');
      if (value !== null) {
        // We have data!!
        setContacts(JSON.parse(value));
      } else {
        console.log('contact nai mille');
      }
    } catch (error) {
      // Error retrieving data
      console.log('contact lane mai error hai bhai', error);
    }
  };
  const storeContacts = async ({name, walletAddress}) => {
    try {
      let input = [{name: name, walletAddress: walletAddress}];
      getContacts();
      if (contacts !== null) {
        const temp = contacts;
        temp.push({name: name, walletAddress: walletAddress});
        await AsyncStorage.setItem('myContacts', JSON.stringify(temp));
      } else {
        await AsyncStorage.setItem('myContacts', JSON.stringify(input));
      }
      getContacts();
    } catch (error) {
      // Error retrieving data
      console.log('storeContact mai error hai bhai', error);
    }
  };

  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useMemo(
    () =>
      setWalletAddress(
        web3.givenProvider?.selectedAddress || user?.get('ethAddress'),
      ),
    [web3, user],
  );

  const value = {
    walletAddress,
    chainId: '0x1',
    name,
    setName,
    getName,
    storeName,
    contacts,
    setContacts,
    getContacts,
    storeContacts,
  };

  return (
    // USE THIS TO SKIP LOGIN THROUGH WALLET (FOR DEVELOPMENT PURPOSES)
    // <MoralisDappContext.Provider
    //   value={{
    //     walletAddress: '0x29684Ca7D10F82b9dC7E5a447e33e7A99e10813F',
    //     chainId: '0x1',
    //   }}>
    //   {children}
    // </MoralisDappContext.Provider>

    //USE THIS DURING PRODUCTION
    <MoralisDappContext.Provider value={value}>
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error('useMoralisDapp must be used within a MoralisDappProvider');
  }
  return context;
}

export {MoralisDappProvider, useMoralisDapp};
