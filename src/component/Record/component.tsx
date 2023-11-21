import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import { HStack, Text, VStack } from 'native-base';

import { IRecord } from '../../types/types';

type RecordProps = {
  record: IRecord;
  index: number;
};

export default function Record({ record, index }: RecordProps) {
  const date = moment(record.createdAt).format('MMM Do YY');
  const time = moment(record.createdAt).format('h:mm a');
  const iconName = record.systemsAnswer ? 'check' : 'exclamation';

  return (
    <HStack mb={5} alignItems={'center'}>
      <VStack w={'75%'} paddingX={5} borderWidth={2} borderRadius={30}>
        <Text bold fontSize={'lg'}>
          Record {index}.
        </Text>

        <HStack justifyContent={'space-between'}>
          <Text fontSize={'lg'}>{date}</Text>
          <Text fontSize={'lg'}>{time}</Text>
        </HStack>

        <Text textAlign={'center'} fontSize={'lg'}>
          Choice: {record.patientChoice ? 'Sound' : 'No sound'}
        </Text>
      </VStack>

      <VStack w={'25%'} alignItems={'center'}>
        <Icon name={iconName} size={30} color={'black'} />
      </VStack>
    </HStack>
  );
}
