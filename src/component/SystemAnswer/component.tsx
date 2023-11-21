import React, { useEffect, useState } from 'react';
import SoundPlayer from 'react-native-sound-player';
import Icon from 'react-native-vector-icons/Ionicons';
import { HStack, Text, View } from 'native-base';

import { IRecord } from '../../types/types';

type SystemAnswerProps = {
  answer: IRecord | undefined;
};

export default function SystemAnswer({ answer }: SystemAnswerProps) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (answer === undefined) {
      playSound(false);
      setMessage('Something went wrong!');
    } else {
      console.log(answer.systemsAnswer, 'play sound system answer');
      playSound(answer.systemsAnswer);
      if (answer.systemsAnswer) {
        setMessage('You guessed!');
      } else {
        setMessage('You missed!');
      }
    }
  }, [answer]);

  function playSound(isCorrect: boolean) {
    let soundName = isCorrect ? 'correct' : 'incorrect';

    try {
      SoundPlayer.playSoundFile(soundName, 'mp3');
    } catch (e) {
      console.log('cannot play the sound file', e);
    }
  }

  return (
    <View borderWidth={2} borderRadius={30} padding={5} mt={10}>
      <HStack alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'2xl'} bold>
          {message}
        </Text>
        {answer === undefined ? (
          <Icon name={'wifi'} size={35} color={'red'} />
        ) : (
          <HStack>
            <Icon
              name={answer.systemsAnswer ? 'checkmark' : 'close'}
              size={60}
              color={answer.systemsAnswer ? 'green' : 'red'}
            />
            <Icon name="ear-outline" size={60} color={'black'} />
          </HStack>
        )}
      </HStack>
    </View>
  );
}
