import React, { useState } from 'react';
import { useEffect } from 'react';
import { Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Flex, Input, Text, View } from 'native-base';

import { CustomAlert } from '../../component/Alert/component';
import { setUser } from '../../features/auth/authSlice';
import { MainStackParamList } from '../../navigation/MainStack';
import { RootState } from '../../store/store';

type LoginProps = NativeStackScreenProps<MainStackParamList, 'SignUp'>;

export default function Login({ navigation }: LoginProps) {
  const [name, setName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');

  const height = Dimensions.get('window').height;

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const isRecordPermissionsGranted = useSelector(
    (state: RootState) => state.user.isRecordPermissionsGranted,
  );

  const isNotificationPermissionsGranted = useSelector(
    (state: RootState) => state.user.isNotificationPermissionsGranted,
  );

  useEffect(() => {
    if (user?.name) {
      navigation.navigate('RunApplication');
    }
  }, []);

  const setData = async () => {
    if (!name.length) {
      setShowAlert(true);
      setAlertMessage('Sorry, it is impossible continue without login');
    } else {
      setAlertMessage('');
      dispatch(setUser({ name }));

      if (isRecordPermissionsGranted && isNotificationPermissionsGranted) {
        navigation.navigate('RunApplication');
      } else {
        setShowAlert(true);

        !isRecordPermissionsGranted &&
          setAlertMessage('Record audio permission is required');
        !isNotificationPermissionsGranted &&
          setAlertMessage('Notification permission is required');
      }
    }
  };

  return (
    <Flex justifyContent={'flex-start'} flex={1} bg={'#fff'} p={5} pt={0}>
      <CustomAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={alertMessage}
        title={'An error occurred!'}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={200}>
        <View height={height / 2}>
          <Flex justifyContent={'flex-end'} height={'90%'}>
            <Flex
              pt={3}
              width={'100%'}
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'center'}>
              <Icon name="address-card" size={60} color={'black'} />
              <Text ml={5} fontSize="3xl" bold>
                What's Your Name?
              </Text>
            </Flex>
            <View flexDirection={'row'} mt={3}>
              <Input
                borderRadius={10}
                fontSize={'lg'}
                w={'100%'}
                size={'lg'}
                placeholder="Please, enter name"
                maxLength={24}
                onChangeText={value => {
                  setShowAlert(false);
                  setName(value);
                }}
                onFocus={() => setShowAlert(false)}
                InputRightElement={
                  <Button
                    size="lg"
                    rounded="none"
                    w="1/4"
                    h="full"
                    onPress={setData}>
                    Login
                  </Button>
                }
              />
            </View>
          </Flex>
        </View>
      </KeyboardAvoidingView>
    </Flex>
  );
}
