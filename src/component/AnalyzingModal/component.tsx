import * as React from 'react';
import { Heading, HStack, Spinner, View } from 'native-base';

export default function AnalyzingModal() {
  return (
    <View justifyContent={'center'} flex={1} alignItems={'center'}>
      <HStack space={2} justifyContent="center" alignItems={'center'}>
        <Spinner accessibilityLabel="Analyzing" size={'lg'} />
        <Heading color={'black'} fontSize="2xl">
          Analyzing...
        </Heading>
      </HStack>
    </View>
  );
}
