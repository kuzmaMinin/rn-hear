import React from 'react';
import { StyleSheet, Text } from 'react-native';

type CustomTextProps = {
  style?: {};
  children: any;
};

export default function CustomText(props: CustomTextProps) {
  return (
    <Text style={[styles.text, { ...props.style }]}>{props.children}</Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: 'center',
  },
});
