import React from 'react';
import { Text } from 'native-base';

type HeaderProps = {
  title: string;
  paddingX?: number;
};

export default function Title({ title, paddingX = 0 }: HeaderProps) {
  return (
    <Text fontSize={'3xl'} bold textAlign={'center'} paddingX={paddingX}>
      {title}
    </Text>
  );
}
