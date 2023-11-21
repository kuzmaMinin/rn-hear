import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack, Slider, View, VStack } from 'native-base';

import ScaleDivision from '../ScaleDivision/component';
import Subtitle from '../Subtitle/component';

type MoodProps = {
  setMood: (mood: number) => void;
  disabled?: boolean;
};

export default function Mood({ setMood, disabled = false }: MoodProps) {
  const scaleLength = 5;

  function renderScale(length: number) {
    return [...Array(length)].map((x, i) => (
      <ScaleDivision index={i + 1} key={`${i}_${x}`} />
    ));
  }

  return (
    <VStack>
      <Subtitle subtitle={'How are you feeling today?'} />
      <HStack justifyContent={'space-between'}>
        {renderScale(scaleLength)}
      </HStack>
      <View paddingX={2.5}>
        <Slider
          isDisabled={disabled}
          defaultValue={50}
          size="sm"
          step={25}
          onChange={(v: number) => setMood(Math.floor(v / 25 + 1))}>
          <Slider.Track>
            <Slider.FilledTrack />
          </Slider.Track>
          <Slider.Thumb />
        </Slider>
      </View>

      <HStack justifyContent={'space-between'}>
        <Icon name="sad-outline" size={30} color={'black'} />
        <Icon name="happy-outline" size={30} color={'black'} />
      </HStack>
    </VStack>
  );
}
