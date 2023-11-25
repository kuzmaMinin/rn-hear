import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Checkbox, Flex, Input, Text, View } from 'native-base';

import Title from '../../component/Title/component';
import { MainStackParamList } from '../../navigation/MainStack';

type LoginProps = NativeStackScreenProps<MainStackParamList, 'Consent'>;

export default function Consent({ navigation }: LoginProps) {
  const [isAgree, setIsAgree] = useState(false);
  const [fullName, setFullName] = useState('');

  function handleAgreeChange(value: boolean) {
    setIsAgree(value);
  }

  function onFullNameChange(value: string) {
    if (!value) {
      setIsAgree(false);
    }
    setFullName(value);
  }

  async function handleAgreement() {
    try {
      if (fullName) {
        await AsyncStorage.setItem('consentFullName', fullName);
      }
      navigation.navigate('SignUp');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Flex flex={1} bg={'#fff'} p={5} pt={0}>
        <View>
          <Title title="What Did I Hear Consent Form" paddingX={5} />
        </View>
        <ScrollView>
          <Text textAlign={'justify'}>
            1. Purpose of application: Unusual auditory experiences such as
            hallucinations are associated with schizophrenia and related psychotic
            disorders. This application aims to test whether or not it is possible
            to help users more accurately distinguish between such experiences and
            reality through the use of auditory analysis of surroundings and
            immediate feedback to the user.
          </Text>
          <Text textAlign={'justify'}>
            2. Description of application: Users are expected to use the
            application in a quiet and isolated setting. The application, once
            opened, starts recording sounds in your environment. Once a user wants
            to utilize the application, they will go through and answer the
            prompted questions after which an auditory analysis will commence
            beginning with the last 5 seconds of recorded sound. Analyzed sound
            will be compared to user response and immediate feedback is provided.
            All records are then deleted.
          </Text>
          <Text textAlign={'justify'}>
            3. Reasonably foreseeable risks or discomforts of application: There
            is no risk or discomfort associated with this application.
          </Text>
          <Text textAlign={'justify'}>
            4. Expected benefits of application: This application is not designed
            to serve as a cure for unusual auditory experiences but rather as a
            learning device for the user. The benefit, as such, is the potential
            for better accuracy for the user in distinguishing between unusual
            auditory experiences and reality.
          </Text>
          <Text textAlign={'justify'}>
            5. Other treatments available: Other treatments commonly used to treat
            auditory hallucinations may include the use of antipsychotic
            medications, and cognitive behavioral therapy (CBT).
          </Text>
          <Text textAlign={'justify'}>
            6. Use of research results and Confidentiality: Information collected
            for the purpose of this application will be kept confidential as
            required by law. The results of this application may be published for
            scientific purposes, but your records or identity will not be revealed
            unless required by law.
          </Text>
          <View mt={3}>
            <Text fontWeight={'bold'} pb={3}>
              Please, include your full name if You consent to the above
              information
            </Text>
            <Input
              borderRadius={10}
              fontSize={'lg'}
              w={'100%'}
              size={'lg'}
              maxLength={24}
              onChangeText={onFullNameChange}
              onFocus={() => {}}
            />
          </View>
        </ScrollView>
        <View mt={5}>
          <Checkbox
            value="agree"
            isChecked={isAgree}
            isDisabled={!fullName}
            accessibilityLabel="Are you agree with consent"
            onChange={handleAgreeChange}>
            I accept the terms in the consent form
          </Checkbox>
        </View>
        <Button
          mt={5}
          size="lg"
          rounded="lg"
          h={50}
          isDisabled={!isAgree}
          onPress={handleAgreement}>
          I Agree
        </Button>
      </Flex>
    </KeyboardAvoidingView>
  );
}
