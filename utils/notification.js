import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

export async function registerForPushNotificationsAsync() {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    return finalStatus === 'granted';
  } else {
    console.warn('Must use physical device for notifications');
    return false;
  }
}
export async function scheduleDailyReminder(taskText, hour = 9, minute = 0) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Task Reminder',
      body: taskText,
    },
    trigger: {
      hour,
      minute,
      repeats: true, 
    },
  });
}
