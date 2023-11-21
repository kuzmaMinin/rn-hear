import React from 'react';
import { View } from 'react-native';
import { HStack } from 'native-base';

import CustomButton from '../Button/component';
import Subtitle from '../Subtitle/component';

interface PollProps {
  onChoice(choice: boolean): void;
  subtitle: string;
  disabled: boolean;
}

export default function Poll({ onChoice, subtitle, disabled }: PollProps) {
  function choiceHandler(choice: boolean) {
    onChoice(choice);
  }

  return (
    <View>
      <Subtitle subtitle={subtitle} />

      <HStack space={10} w={'100%'} justifyContent={'center'} mt={5}>
        <CustomButton
          title={'Yes'}
          onPress={() => choiceHandler(true)}
          width={'44%'}
          disabled={disabled}
        />
        <CustomButton
          title={'No'}
          onPress={() => choiceHandler(false)}
          width={'44%'}
          disabled={disabled}
        />
      </HStack>
    </View>
  );
}
