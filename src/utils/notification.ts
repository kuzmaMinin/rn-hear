import notifee, { TriggerType } from '@notifee/react-native';
import moment from 'moment';

export async function onCreateTriggerNotification() {
  const triggers = [
    {
      name: 'firstTrigger',
      timeStamp: moment().set({ hour: 11, minute: 0 }).valueOf(),
    },
    {
      name: 'secondTrigger',
      timeStamp: moment().set({ hour: 16, minute: 0 }).valueOf(),
    },
  ];

  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  for (let trigger of triggers) {
    await notifee.createTriggerNotification(
      {
        title: `Are you experiencing voices or feeling stressed? ${trigger.name}`,
        body: '',
        android: {
          channelId,
        },
      },
      {
        type: TriggerType.TIMESTAMP,
        timestamp: trigger.timeStamp,
      },
    );
  }
}
