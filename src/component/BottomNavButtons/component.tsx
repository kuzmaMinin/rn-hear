import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Spacer, VStack } from 'native-base';

import { MainStackParamList } from '../../navigation/MainStack';
import CustomButton from '../Button/component';

type BottomNavButtonsProps = {
  navigation: NativeStackNavigationProp<
    MainStackParamList,
    'RunApplication',
    undefined
  >;
};

export default function BottomNavButtons({
  navigation,
}: BottomNavButtonsProps) {
  return (
    <VStack space={5} backgroundColor={'#fff'} pb={5}>
      <CustomButton
        title={'Previous Records'}
        onPress={() => navigation.navigate('PreviousRecords')}
        rightIcon={
          <>
            <Spacer />
            <Icon name="calendar" size={30} color={'black'} />
          </>
        }
        pl={10}
        pr={10}
        width={'100%'}
      />

      <CustomButton
        title={'Personal Stat'}
        onPress={() => navigation.navigate('PersonalStat')}
        rightIcon={
          <>
            <Spacer />
            <Icon name="line-chart" size={30} color={'black'} />
          </>
        }
        pl={10}
        pr={10}
        width={'100%'}
      />
    </VStack>
  );
}
