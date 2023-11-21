import React from 'react';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack, View, VStack } from 'native-base';
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory-native';

type GraphProps = {
  data: { x: Date | string; y: number }[];
  startDate?: Date | string;
  endDate?: Date | string;
};

export default function Graph({ data }: GraphProps) {
  const width = Dimensions.get('window').width;

  // console.log(data, 'data dates');

  function formatTickLabels(time: Date | string) {
    if (data.length) {
      return new Date(time).getHours() !== 0
        ? ''
        : `${new Date(time).getMonth() + 1}.${new Date(time).getDate()}`;
    } else {
      return '';
    }
  }

  return (
    <HStack mt={5}>
      <VStack justifyContent={'space-between'} paddingBottom={10}>
        <Icon name="happy-outline" size={30} color={'black'} />
        <Icon name="sad-outline" size={30} color={'black'} />
      </VStack>
      <View>
        <VictoryChart
          width={width * 0.8}
          height={150}
          scale={{ x: 'time' }}
          padding={{ left: 10, top: 0, right: 10, bottom: 30 }}>
          <VictoryAxis
            padding={{ left: 50, top: 100 }}
            style={{ tickLabels: { fontSize: 10 } }}
            crossAxis
            tickFormat={time => formatTickLabels(time)}
          />
          <VictoryAxis dependentAxis style={{ tickLabels: { fill: 'none' } }} />
          <VictoryLine
            style={{
              data: { stroke: '#06b6d4' },
            }}
            data={data}
          />
        </VictoryChart>
      </View>
    </HStack>
  );
}
