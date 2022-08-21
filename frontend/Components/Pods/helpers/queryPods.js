export const getContent = async data => {
  const newData = await Promise.all(
    data.map(async (item, index) => {
      try {
        item = JSON.parse(JSON.stringify(item));
        const response = await fetch(item.contentUri);
        const appendData = await response.json();
        return {...item, ...appendData};
      } catch (error) {
        console.log(error);
      }
    }),
  );
  return newData;
};
export const getSharedPods = async (data, setSharedPods) => {
  let newData = await getContent(data);
  setSharedPods(newData);
};
export const getMyPods = async (data, setMyPods) => {
  let newData = await getContent(data);
  setMyPods(newData);
};
export const getOwner = ({address, myAddress}) => {
  if (address === myAddress) {
    return 'You';
  } else {
    return 'Someone Else';
  }
};
export const checkInContact = ({address, contacts}) => {
  const result = contacts.find(contact => contact.walletAddress === address);
  if (result) {
    return result.name;
  } else {
    return address;
  }
};
