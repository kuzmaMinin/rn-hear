import React from 'react';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { HStack, Spinner, Text, View, VStack } from 'native-base';

import { CustomAlert } from '../../component/Alert/component';
import Record from '../../component/Record/component';
import Title from '../../component/Title/component';
import { setRecordsFetchError } from '../../features/records/recordsSlice';
import { RootState } from '../../store/store';
import { IRecord } from '../../types/types';

export default function PreviousRecords() {
  const dispatch = useDispatch();
  const isLoadingRecords = useSelector(
    (state: RootState) => state.records.isLoadingRecords,
  );
  const records = useSelector((state: RootState) => state.records.records);
  const recordsFetchError = useSelector(
    (state: RootState) => state.records.recordsFetchError,
  );

  function renderSpinner() {
    return (
      <View justifyContent={'center'} flex={1} alignItems={'center'}>
        <HStack space={2} justifyContent="center" alignItems={'center'}>
          <Spinner accessibilityLabel="Analyzing" size={'lg'} />
        </HStack>
      </View>
    );
  }

  function renderError(error: string) {
    return (
      <CustomAlert
        showAlert={true}
        setShowAlert={() => dispatch(setRecordsFetchError(undefined))}
        message={error}
        title={'Something went wrong!'}
      />
    );
  }

  function renderRecords(data: IRecord[] | undefined) {
    return (
      <>
        <HStack mb={5}>
          <VStack w={'75%'}>
            <Text fontSize={'xl'} bold>
              Record
            </Text>
          </VStack>
          <View w={'25%'}>
            <Text fontSize={'xl'} bold>
              Correct?
            </Text>
          </View>
        </HStack>
        <FlatList
          data={data}
          renderItem={({ item, index }) => (
            <Record record={item} index={index + 1} />
          )}
          keyExtractor={(item, index) => `${index}_${item.createdAt}`}
        />
      </>
    );
  }
  return (
    <View style={styles.container}>
      <Title title="All Recordings" />
      {isLoadingRecords
        ? renderSpinner()
        : recordsFetchError
        ? renderError(recordsFetchError)
        : renderRecords(records)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0,
  },
});
