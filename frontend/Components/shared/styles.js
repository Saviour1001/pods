import {StyleSheet} from 'react-native';

export const colors = {
  while: '#FFFFFF',
  black: '#000000',
  green: '#CEFF67',
  lightgreen: 'rgba(206, 255, 103, 0.3)',
  purple: '#9382FC',
  gray: '#AAAAAA',
};

export const fontFamilies = {
  CenturyGothic_Regular: 'CenturyGothic', //400
  CenturyGothic_Italic: 'CenturyGothic-Italic', //400
  CenturyGothic_Bold: 'CenturyGothic-Bold', //700
  CenturyGothic_BoldItalic: 'CenturyGothic-BoldItalic', //700
};

export const globalStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  column: {
    flexDirection: 'column',
  },
});
