import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import {
  Alert,
  Box,
  CloseIcon,
  Collapse,
  HStack,
  IconButton,
  Text,
  View,
  VStack,
} from 'native-base';

type CustomAlertProps = {
  showAlert: boolean;
  setShowAlert: (show: boolean) => void;
  message: string;
  title: string;
};

export function CustomAlert({
  showAlert,
  setShowAlert,
  message,
  title,
}: CustomAlertProps) {
  let deviceWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <Collapse isOpen={showAlert} w={deviceWidth}>
        <Alert status="error">
          <VStack space={1} flexShrink={1} w={'100%'}>
            <HStack
              flexShrink={1}
              space={2}
              alignItems="center"
              justifyContent="space-between">
              <HStack flexShrink={1} space={2} alignItems="center">
                <Alert.Icon />
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  _dark={{
                    color: 'coolGray.800',
                  }}>
                  {title}
                </Text>
              </HStack>
              <IconButton
                variant="unstyled"
                _focus={{
                  borderWidth: 0,
                }}
                icon={<CloseIcon size="3" color="coolGray.600" />}
                onPress={() => {
                  console.log('close');
                  setShowAlert(false);
                }}
              />
            </HStack>
            <Box
              pl="6"
              _dark={{
                _text: {
                  color: 'coolGray.600',
                },
              }}>
              {message}
            </Box>
          </VStack>
        </Alert>
      </Collapse>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -1,
    left: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    elevation: 5,
    zIndex: 5,
  },
});
