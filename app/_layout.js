import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TaskProvider } from '../Context/TaskContext';
import { registerForPushNotificationsAsync } from "../utils/notification";

export default function Layout() {
  Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);
  return (
    <GestureHandlerRootView style={styles.container}>
      <TaskProvider>

        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: '#222831' },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="index" options={{ title: "Task" }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Add Task' }} />
        </Stack>
      </TaskProvider>
    </GestureHandlerRootView>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});