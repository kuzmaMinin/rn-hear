import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { HStack, ScrollView, Spinner, Text, View, VStack } from 'native-base';
import DateRangePicker from 'rn-select-date-range';

import Graph from '../../component/Graph/component';
import Title from '../../component/Title/component';
import { RootState } from '../../store/store';
import { IRecord } from '../../types/types';

function timeFormatter(date: Date | string | number) {
  return moment(date).local().format('LL');
}

interface IDateResponse {
  firstDate: string | moment.Moment;
  secondDate: string | moment.Moment;
}

export default function PersonalStat() {
  const [startDate, selectedStartDate]: any = useState();
  const [endDate, selectedEndDate]: any = useState();

  const isLoadingRecords = useSelector(
    (state: RootState) => state.records.isLoadingRecords,
  );
  const records = useSelector((state: RootState) => state.records.records);

  function filterRecord(record: IRecord, start?: any, end?: any) {
    if (start && end) {
      return (
        moment(start).isSameOrBefore(timeFormatter(record.createdAt)) &&
        moment(end).isSameOrAfter(timeFormatter(record.createdAt))
      );
    }

    if (!start && !end) {
      return moment(timeFormatter(Date.now())).isSame(
        timeFormatter(record.createdAt),
      );
    }
  }

  function onDateChange(date: IDateResponse) {
    selectedStartDate(date.firstDate);
    selectedEndDate(date.secondDate);
  }

  function statView(records: IRecord[], isToday?: boolean) {
    let correctRecordsLength = 0;
    let score = 0;
    if (records) {
      correctRecordsLength = records?.filter(
        record => record.systemsAnswer && record.useCase,
      ).length;
      score = records?.length
        ? Math.round((correctRecordsLength / records.length) * 100)
        : 0;
    }

    return (
      <VStack space={1} mb={5}>
        <Text fontSize={'lg'} bold>
          {isToday ? 'My Daily Stat' : 'Specific Period Stat'}
        </Text>
        <Text fontSize={'sm'}>Total # of records: {records?.length ?? 0}</Text>
        <Text fontSize={'sm'}>Correct answer: {correctRecordsLength}</Text>
        <Text fontSize={'sm'}> Ratio: {score} (# Correct / # Total)</Text>
      </VStack>
    );
  }

  function dailyStat(records: IRecord[]) {
    const recordsToday = records?.filter(record => filterRecord(record));
    return statView(recordsToday, true);
  }

  function periodStat(records: IRecord[], start: Date, end: Date) {
    const recordsForPeriod = records?.filter(record =>
      filterRecord(record, start, end),
    );
    return statView(recordsForPeriod);
  }

  function prepareData(
    records: IRecord[],
    startDate?: Date | string,
    endDate?: Date | string,
  ): { x: Date | string; y: number }[] {
    const preparedData: { x: Date | string; y: number; total?: number }[] = [];

    let recordsForPeriod: IRecord[] = [];
    if (startDate && endDate) {
      recordsForPeriod = records
        ?.filter(record => record.useCase)
        .filter(record => filterRecord(record, startDate, endDate));
    } else {
      recordsForPeriod = records
        ?.filter(record => record.useCase)
        .filter(record =>
          filterRecord(record, moment().subtract(1, 'weeks'), moment()),
        );
    }

    recordsForPeriod
      .map(record => ({ x: record.createdAt, y: Number(record.systemsAnswer) }))
      .forEach(record => {
        const index = preparedData.findIndex(
          obj => timeFormatter(obj.x) === timeFormatter(record.x),
        );

        if (index !== -1) {
          preparedData[index].y += record.y;
          preparedData[index].total! += 1;
        } else {
          preparedData.push({ ...record, total: 1 });
        }
      });
    return preparedData.map(record => {
      record.x = new Date(timeFormatter(record.x));
      record.y = Number(((record.y / record.total!) * 100).toFixed(2));
      delete record.total;
      return record;
    });
  }

  return (
    <View backgroundColor={'#fff'} flex={1} p={5} pt={0}>
      <ScrollView>
        {isLoadingRecords ? (
          <View justifyContent={'center'} flex={1} alignItems={'center'}>
            <HStack space={2} justifyContent="center" alignItems={'center'}>
              <Spinner accessibilityLabel="Analyzing" size={'lg'} />
            </HStack>
          </View>
        ) : (
          <View>
            <Title title="Personal Stat" />

            <View>
              <DateRangePicker
                onSelectDateRange={range => onDateChange(range)}
                blockSingleDateSelection={false}
                responseFormat="YYYY-MM-DD"
                maxDate={moment()}
                confirmBtnTitle={''}
              />
            </View>

            {endDate && startDate ? (
              periodStat(records, startDate, endDate)
            ) : (
              <></>
            )}
            {dailyStat(records)}

            <View>
              <Graph data={prepareData(records, startDate, endDate)} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
