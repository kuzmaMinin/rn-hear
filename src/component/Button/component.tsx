import React from 'react';
import { Button, IButtonProps } from 'native-base';

interface CustomButtonProps extends IButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

export default function CustomButton({
  title,
  disabled,
  onPress,
  ...props
}: CustomButtonProps) {
  return (
    <Button
      _text={{
        color: 'black',
        fontSize: 'xl',
      }}
      size={'lg'}
      variant={'outline'}
      borderColor={'black'}
      borderWidth={2}
      width={'45%'}
      borderRadius={20}
      isDisabled={disabled}
      onPress={onPress}
      {...props}>
      {title}
    </Button>
  );
}
