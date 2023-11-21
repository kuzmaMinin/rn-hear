import React from 'react';
import { Center, Text } from 'native-base';

type SubtitleProps = {
  subtitle: string;
  mt?: number;
};

export default function Subtitle({ subtitle, mt = 2 }: SubtitleProps) {
  return (
    <Center>
      <Text fontSize={'2xl'} bold mt={mt} textAlign={'center'}>
        {subtitle}
      </Text>
    </Center>
  );
}
