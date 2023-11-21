import React, { useEffect } from 'react';
import { BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import notifee, { AuthorizationStatus } from '@notifee/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Flex, HStack, Text, View } from 'native-base';

import CustomButton from '../../component/Button/component';
import Title from '../../component/Title/component';
import {
  setIsNotificationPermissionsGranted,
  setIsRecordPermissionsGranted,
} from '../../features/auth/authSlice';
import { MainStackParamList } from '../../navigation/MainStack';
import { CONSENT_FULL_NAME } from '../../utils/constants';
import { requestAudioRecordPermission } from '../../utils/permissions';

type IntroductionProps = NativeStackScreenProps<
  MainStackParamList,
  'Introduction'
>;

export default function Introduction({ navigation }: IntroductionProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    requestPermissions();
  }, []);

  async function requestPermissions() {
    const notificationPermission = await notifee.requestPermission();
    const audioRecordPermission = await requestAudioRecordPermission();

    if (
      notificationPermission.authorizationStatus >=
      AuthorizationStatus.AUTHORIZED
    ) {
      dispatch(setIsNotificationPermissionsGranted(true));
    }

    if (audioRecordPermission === 'granted') {
      dispatch(setIsRecordPermissionsGranted(true));
    }
  }

  async function handleOk() {
    const fullName = await AsyncStorage.getItem(CONSENT_FULL_NAME);
    if (fullName) {
      navigation.navigate('SignUp');
    } else {
      navigation.navigate('Consent');
    }
  }

  function handleNo() {
    BackHandler.exitApp();
  }

  return (
    <Flex flex={1} bg={'#fff'} p={5} pt={0}>
      <Title title="What Did I Hear?" />
      <View>
        <Text textAlign={'center'} fontSize={'xl'} pt={3}>
          Some people with emotional difficulties tend to have unusual
          experience such as hearing voices and are often unable to distinguish
          whether they are real. This app helps users to understand such
          experiences
        </Text>
        <Text textAlign={'center'} fontSize={'xl'} pt={3} fontWeight={'bold'}>
          Do You Consent?
        </Text>
        <HStack space={10} w={'100%'} justifyContent={'center'} mt={5}>
          <CustomButton title={'Yes'} onPress={handleOk} width={'44%'} />
          <CustomButton title={'No'} onPress={handleNo} width={'44%'} />
        </HStack>
      </View>
    </Flex>
  );
}
