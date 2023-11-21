import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { HeaderBackButton } from '@react-navigation/elements';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  setCreateRecordError,
  setCurrentRecord,
  setMode,
  setPrecondition,
} from '../features/records/recordsSlice';
import Consent from '../screens/Consent/component';
import Introduction from '../screens/Introduction/component';
import Login from '../screens/Login/component';
import Main from '../screens/Main/component';
import Mode from '../screens/Mode/component';
import PersonalStat from '../screens/PersonalStat/component';
import PreviousRecords from '../screens/PreviousRecords/component';
import RunApplication from '../screens/RunApplication/component';
import { PartialRecord } from '../types/types';

export type MainStackParamList = {
  Introduction: undefined;
  Consent: undefined;
  SignUp: undefined;
  RunApplication: undefined;
  Mode: {
    onCancelRecord: (newRecord: PartialRecord) => Promise<void>;
  };
  HomeScreen: {
    onCancelRecord: (newRecord: PartialRecord) => Promise<void>;
  };
  PreviousRecords: undefined;
  PersonalStat: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainStack() {
  const dispatch = useDispatch();

  function handlePressBackButton(
    navigation: NavigationProp<MainStackParamList>,
  ) {
    navigation.navigate('RunApplication');
    dispatch(setMode(undefined));
    dispatch(setPrecondition(undefined));
    dispatch(setCreateRecordError(undefined));
    dispatch(setCurrentRecord(undefined));
  }

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'Introduction'}>
          <Stack.Screen
            name="Introduction"
            component={Introduction}
            options={{
              title: '',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Consent"
            component={Consent}
            options={({ navigation }) => ({
              title: '',
              headerLeft: props => (
                <HeaderBackButton
                  {...props}
                  onPress={() => navigation.navigate('Introduction')}
                />
              ),
            })}
          />
          <Stack.Screen
            name="SignUp"
            component={Login}
            options={{
              title: '',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="RunApplication"
            component={RunApplication}
            options={{
              title: '',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="Mode"
            component={Mode}
            options={({ navigation }) => ({
              title: '',
              headerLeft: props => (
                <HeaderBackButton
                  {...props}
                  onPress={() => handlePressBackButton(navigation)}
                />
              ),
            })}
          />
          <Stack.Screen
            name="HomeScreen"
            component={Main}
            options={({ navigation }) => ({
              title: '',
              headerLeft: props => (
                <HeaderBackButton
                  {...props}
                  onPress={() => handlePressBackButton(navigation)}
                />
              ),
            })}
          />
          <Stack.Screen
            name="PreviousRecords"
            component={PreviousRecords}
            options={({ navigation }) => ({
              title: '',
              headerLeft: props => (
                <HeaderBackButton
                  {...props}
                  onPress={() => handlePressBackButton(navigation)}
                />
              ),
            })}
          />
          <Stack.Screen
            name="PersonalStat"
            component={PersonalStat}
            options={({ navigation }) => ({
              title: '',
              headerLeft: props => (
                <HeaderBackButton
                  {...props}
                  onPress={() => handlePressBackButton(navigation)}
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
