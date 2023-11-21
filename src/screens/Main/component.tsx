import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { ScrollView, View } from 'native-base';

import { CustomAlert } from '../../component/Alert/component';
import AnalyzingModal from '../../component/AnalyzingModal/component';
import Comment from '../../component/Comment/component';
import Poll from '../../component/Poll/component';
import SystemAnswer from '../../component/SystemAnswer/component';
import Title from '../../component/Title/component';
import {
  setCreateRecordError,
  setCurrentRecord,
  setMode,
  setPrecondition,
} from '../../features/records/recordsSlice';
import { MainStackParamList } from '../../navigation/MainStack';
import { RootState } from '../../store/store';

type MainProps = BottomTabScreenProps<MainStackParamList, 'HomeScreen'>;

export default function Main({ route, navigation }: MainProps) {
  const { onCancelRecord } = route.params;
  const dispatch = useDispatch();

  const preconditions = useSelector(
    (state: RootState) => state.records.preconditions,
  );
  const isWaitingForResponse = useSelector(
    (state: RootState) => state.records.isWaitingForResponse,
  );
  const currentRecord = useSelector(
    (state: RootState) => state.records.currentRecord,
  );
  const createRecordError = useSelector(
    (state: RootState) => state.records.createRecordError,
  );
  const useCase = useSelector((state: RootState) => state.records.useCase);
  const mood = useSelector((state: RootState) => state.records.mood);

  const [comment, setComment] = useState('');
  const [wantToStart, setWantToStart] = useState(false);
  const [dieIsCast, setDieIsCast] = useState(false);

  async function onChoice(patientChoice: boolean) {
    setDieIsCast(true);

    const newRecord = {
      mood,
      useCase,
      preconditions,
      patientChoice,
      comment,
    };

    onCancelRecord(newRecord);
  }

  function onWantToStart(choice: boolean) {
    if (choice) {
      setWantToStart(true);
    }
    return;
  }

  function onCloseAlert() {
    dispatch(setCreateRecordError(undefined));
    dispatch(setMode(undefined));
    dispatch(setPrecondition(undefined));
    dispatch(setCurrentRecord(undefined));
    navigation.navigate('RunApplication');
  }

  return (
    <View backgroundColor={'#fff'} flex={1} p={5} pt={0}>
      {dieIsCast && createRecordError && (
        <CustomAlert
          showAlert={true}
          setShowAlert={onCloseAlert}
          message={createRecordError}
          title={'Something went wrong!'}
        />
      )}
      <Title title="What Did I Hear?" />

      <View flex={1}>
        <ScrollView contentContainerStyle={styles.container}>
          <Poll
            onChoice={onWantToStart}
            subtitle={'Would you like will analyze the sounds around you?'}
            disabled={wantToStart}
          />
          {wantToStart && (
            <>
              <Comment isDisabled={dieIsCast} setComment={setComment} />
              <Poll
                disabled={dieIsCast}
                onChoice={onChoice}
                subtitle={'Did you hear something?'}
              />
            </>
          )}
          {isWaitingForResponse ? (
            <AnalyzingModal />
          ) : (
            dieIsCast && <SystemAnswer answer={currentRecord} />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
});
