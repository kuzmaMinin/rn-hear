import React, { useState } from 'react';
import { TextArea, VStack } from 'native-base';

import CustomButton from '../Button/component';

type CommentProps = {
  isDisabled: boolean;
  setComment: (text: string) => void;
};

export default function Comment({
  isDisabled = false,
  setComment,
}: CommentProps) {
  const [showTextArea, setShowTextArea] = useState(false);

  return !isDisabled ? (
    <VStack>
      {!showTextArea && (
        <CustomButton
          mt={5}
          title={'Add comment'}
          onPress={() => setShowTextArea(true)}
          width={'100%'}
          disabled={false}
        />
      )}
      {showTextArea && (
        <TextArea
          placeholder={'Are you hearing voices or sounds without voices ?'}
          autoCompleteType
          borderRadius={20}
          h={20}
          fontSize={16}
          mt={5}
          isDisabled={isDisabled}
          onChangeText={setComment}
        />
      )}
    </VStack>
  ) : (
    <></>
  );
}
