import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors, fontFamilies} from './styles';

export const H1 = ({children, style, ...props}) => {
  return (
    <Text style={[styles.H1, style]} {...props}>
      {children}
    </Text>
  );
};
export const H2 = ({children, style, ...props}) => {
  return (
    <Text style={[styles.H2, style]} {...props}>
      {children}
    </Text>
  );
};
export const H3 = ({children, style, ...props}) => {
  return (
    <Text style={[styles.H3, style]} {...props}>
      {children}
    </Text>
  );
};
export const P1 = ({children, style, ...props}) => {
  return (
    <Text style={[styles.P1, style]} {...props}>
      {children}
    </Text>
  );
};
export const P2 = ({children, style, ...props}) => {
  return (
    <Text style={[styles.P2, style]} {...props}>
      {children}
    </Text>
  );
};

export const styles = StyleSheet.create({
  H1: {
    fontFamily: fontFamilies.CenturyGothic_BoldItalic,
    fontSize: 24,
    color: colors.black,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {width: -4, height: 4},
    textShadowRadius: 15,
  },
  H2: {
    fontFamily: fontFamilies.CenturyGothic_BoldItalic,
    fontSize: 24,
    color: colors.black,
  },
  H3: {
    fontFamily: fontFamilies.CenturyGothic_BoldItalic,
    fontSize: 16,
    color: colors.black,
  },
  P1: {
    fontFamily: fontFamilies.CenturyGothic_Italic,
    fontSize: 14,
    color: colors.black,
  },
  P2: {
    fontFamily: fontFamilies.CenturyGothic_Italic,
    fontSize: 12,
    color: colors.black,
  },
});
