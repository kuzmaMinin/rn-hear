import React, { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, Platform, StyleSheet } from 'react-native';
import AudioRecord from 'react-native-audio-record';
// @ts-ignore
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch, useSelector } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HStack, ScrollView, View } from 'native-base';

import { CustomAlert } from '../../component/Alert/component';
import BottomNavButtons from '../../component/BottomNavButtons/component';
import CustomButton from '../../component/Button/component';
import Mood from '../../component/Mood/component';
import Preconditions from '../../component/Preconditions/component';
import Subtitle from '../../component/Subtitle/component';
import Title from '../../component/Title/component';
import {
  fetchRecords,
  sendChunks,
  setCreateRecordError,
  setCurrentRecord,
  setMode,
  setMood,
  setPrecondition,
} from '../../features/records/recordsSlice';
import { MainStackParamList } from '../../navigation/MainStack';
import { AppDispatch, RootState } from '../../store/store';
import { PartialRecord } from '../../types/types';
import { onCreateTriggerNotification } from '../../utils/notification';
import { checkAudioRecordPermission } from '../../utils/permissions';

type RunApplicationProps = NativeStackScreenProps<
  MainStackParamList,
  'RunApplication'
>;

let chunksArray: string[] = [];

export default function RunApplication({ navigation }: RunApplicationProps) {
  const preconditions = useSelector(
    (state: RootState) => state.records.preconditions,
  );
  const dispatch = useDispatch<AppDispatch>();

  const appState = useRef(AppState.currentState);
  const [showAlert, setShowAlert] = useState(false);

  const style = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      flexGrow: 1,
    },
  });

  const options = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6,
    wavFile: 'is-it-a-voice.wav',
  };

  useEffect(() => {
    dispatch(fetchRecords());

    onCreateTriggerNotification().then(() =>
      console.log('done create trigger'),
    );
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    checkAudioRecordPermission().then(status => {
      if (status) {
        initAudioRecord();
      } else {
        setShowAlert(true);
      }
    });
  }, []);

  function handleAppStateChange(nextAppState: AppStateStatus) {
    if (
      nextAppState.match(/inactive|background/) &&
      appState.current === 'active'
    ) {
      const state = navigation.getState();
      const routeNames = state.routeNames;
      const modeScreenIndex = routeNames.indexOf('Mode');
      const homeScreenIndex = routeNames.indexOf('HomeScreen');

      if (state.index === modeScreenIndex || state.index === homeScreenIndex) {
        navigation.navigate('RunApplication');
        dispatch(setMode(undefined));
        dispatch(setPrecondition(undefined));
        dispatch(setCreateRecordError(undefined));
        dispatch(setCurrentRecord(undefined));
      }

      chunksArray = [];

      if (Platform.OS === 'android') {
        BackgroundTimer.setTimeout(async () => onStartRecord(), 0);
      } else {
        BackgroundTimer.start();
        setTimeout(async () => onStartRecord(), 0);
      }
    }

    if (nextAppState === 'active') {
      onStopRecord();
    }

    appState.current = nextAppState;
  }

  function initAudioRecord() {
    AudioRecord.init(options);

    AudioRecord.on('data', data => {
      if (chunksArray.length < 100) {
        chunksArray.push(data);
      } else {
        chunksArray.splice(0, 1).push(data);
      }
    });
  }

  function onStartRecord() {
    dispatch(setCurrentRecord(undefined));
    AudioRecord.start();
  }

  function onStopRecord() {
    if (Platform.OS === 'android') {
      BackgroundTimer.clearTimeout();
    } else {
      BackgroundTimer.stop();
    }
    AudioRecord.stop();
  }

  async function onCancelRecord(newRecord: PartialRecord) {
    dispatch(sendChunks({ chunksArray, newRecord }));
    chunksArray = [];
  }

  return (
    <ScrollView
      backgroundColor={'#fff'}
      flex={1}
      p={5}
      pt={0}
      contentContainerStyle={style.container}>
      <CustomAlert
        showAlert={showAlert}
        setShowAlert={setShowAlert}
        message={'Audio recording permission is not granted!'}
        title={'Permission error!'}
      />
      <View>
        <Title title="What Did I Hear?" />

        <Subtitle subtitle={'Background Noise Level'} />

        <View mt={5}>
          <Preconditions />
        </View>
        {preconditions !== undefined ? (
          <View mb={3}>
            <Mood setMood={mood => dispatch(setMood(mood))} />

            <Subtitle subtitle={'Are You Alone?'} mt={0} />

            <HStack w={'100%'} justifyContent={'space-between'} mt={5}>
              <CustomButton
                title={'Yes'}
                onPress={() => {
                  navigation.navigate('Mode', {
                    onCancelRecord: onCancelRecord,
                  });
                }}
              />
              <CustomButton title={'No'} />
            </HStack>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View mt={5}>
        <BottomNavButtons navigation={navigation} />
      </View>
    </ScrollView>
  );
}
