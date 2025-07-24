import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTask } from '../Context/TaskContext';
export default function ModalScreen() {
    const router = useRouter();
    const [input, setinput] = useState('');
    const [enableReminder, setenableReminder] = useState(false)
    const [renmindertime, seremindertime] = useState(600)

    const { settasks, tasks } = useTask()


    async function scheduleTaskReminder(taskText) {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: " Task Reminder",
                body: taskText,
            },
            trigger: {
                second: renmindertime,
                repeats: true,
            },
        });
    }


    useEffect(() => {
        const subscription = Notifications.addNotificationReceivedListener(notification => {
            console.log("NOTIFICATION RECEIVED:", notification);
        });

        return () => subscription.remove();
    }, []);
    const handleAdd = () => {

        if (!input.trim()) return;
        const newtask = {
            id: Date.now().toString(),
            text: input,
            done: false,
        };
        settasks([newtask, ...tasks]);
        setinput('');
        if (enableReminder) {

            scheduleTaskReminder(newtask.text)
        }
        router.back();
    };

    return (
        <View style={styles.modal}>
            <Text style={styles.heading}>New task</Text>
            <TextInput
                value={input}
                onChangeText={setinput}
                placeholder="Enter task"
                style={styles.input}
            />
            <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', marginVertical: 10 }} >
                <TouchableOpacity

                    onPress={() => setenableReminder(!enableReminder)}
                >

                    <Ionicons name={enableReminder ? 'checkbox' : 'checkbox-outline'} size={25} />
                </TouchableOpacity>
                <Text>
                    Enable Reminder
                </Text>

            </View>
            {
                enableReminder ? <View>
                    <TextInput
                        value={renmindertime}
                        onChangeText={seremindertime}
                        placeholder="Enter Reminder Time (Default 600 sec Means 10 min )"
                        style={styles.input}
                        inputMode='numeric'
                    />

                </View> : null
            }
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={{ backgroundColor: '#00ADB5', padding: 10, borderRadius: 10, alignItems: 'center' }}
                    onPress={handleAdd}

                >
                    <Text style={{ fontWeight: '700', color: 'white' }} >
                        Create New Task
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: '#e60c0cff', padding: 10, borderRadius: 10, alignItems: 'center' }}

                    onPress={() => router.back()}
                >
                    <Text style={{ fontWeight: '700', color: 'white' }} >
                        Cancel
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modal: { flex: 1, justifyContent: 'center', padding: 20 },
    heading: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: {
        borderBottomWidth: 1,
        fontSize: 18,
        marginBottom: 20,
        padding: 10,

    },
    buttonContainer: {
        gap: 10,
    },
});
