import React from 'react';
import { Text, View } from 'native-base';

type ScaleDivisionProps = {
  index: number;
};

export default function ScaleDivision({ index }: ScaleDivisionProps) {
  return (
    <View width={5}>
      <Text textAlign={'center'}>{index}</Text>
    </View>
  );
}
