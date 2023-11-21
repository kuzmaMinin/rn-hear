import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Spacer, View, VStack } from 'native-base';

import CustomButton from '../../component/Button/component';
import Subtitle from '../../component/Subtitle/component';
import Title from '../../component/Title/component';
import { setMode } from '../../features/records/recordsSlice';
import { MainStackParamList } from '../../navigation/MainStack';

type ModeProps = NativeStackScreenProps<MainStackParamList, 'Mode'>;

export default function Mode({ navigation, route }: ModeProps) {
  const { onCancelRecord } = route.params;
  const dispatch = useDispatch();

  return (
    <View
      backgroundColor={'#fff'}
      flex={1}
      p={5}
      pt={0}
      justifyContent={'space-between'}>
      <View>
        <Title title="What Did I Hear?" />

        <Subtitle subtitle={'I am pressing because:'} />

        <VStack space={5} w={'100%'} justifyContent={'center'} mt={5}>
          <CustomButton
            title={'I am hearing some sounds'}
            onPress={() => {
              navigation.navigate('HomeScreen', {
                onCancelRecord: onCancelRecord,
              });
              dispatch(setMode(true));
            }}
            width={'100%'}
            rightIcon={
              <>
                <Spacer />
                <Icon name="volume-up" size={30} color={'black'} />
              </>
            }
            pl={10}
            pr={10}
          />

          <CustomButton
            title={'I am just checking'}
            onPress={() => {
              navigation.navigate('HomeScreen', {
                onCancelRecord: onCancelRecord,
              });
              dispatch(setMode(false));
            }}
            width={'100%'}
            rightIcon={
              <>
                <Spacer />
                <Icon name="bar-chart" size={30} color={'black'} />
              </>
            }
            pl={10}
            pr={10}
          />
        </VStack>
      </View>
    </View>
  );
}
