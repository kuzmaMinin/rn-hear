import { Platform } from 'react-native';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';

export async function checkAudioRecordPermission() {
  const checkPermission =
    Platform.OS === 'android'
      ? check(PERMISSIONS.ANDROID.RECORD_AUDIO)
      : check(PERMISSIONS.IOS.MICROPHONE);

  const permission = await checkPermission
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          return false;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          return false;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          return false;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          return true;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          return false;
        default:
          return false;
      }
    })
    .catch(error => {
      console.log(error, 'permissions error');
    });
  return permission;
}

export function requestAudioRecordPermission() {
  const requestPermission =
    Platform.OS === 'android'
      ? request(PERMISSIONS.ANDROID.RECORD_AUDIO)
      : request(PERMISSIONS.IOS.MICROPHONE);

  return requestPermission
    .then(result => {
      console.log(result, 'request result');
      return result;
    })
    .catch(error => {
      console.log(error, 'request error');
    });
}
