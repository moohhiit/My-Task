import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { useTask } from '../Context/TaskContext';


export default function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const router = useRouter()
  const { settasks, tasks } = useTask()
  const sortedtasks = [...tasks].sort((a, b) => a.done - b.done);




  const toggleDone = (id) => {
    const updated = tasks.map(tasks => {
      if (!tasks || !tasks.id) {
        console.warn('Invalid todo:', tasks);
        return tasks;
      }
      if (tasks.id === id) {
        return { ...tasks, done: !tasks.done };
      }

      return tasks;
    });

   
    settasks(updated);
  };

  const addButtonTranslate = scrollY.interpolate({
    inputRange: [0, 30],
    outputRange: [0, 200],
    extrapolate: 'clamp',
  });

  // Delete Task From The LocalStorage
  const deleteTask = (id) => {
    settasks(tasks.filter(todo => todo.id !== id));
  };

  const addButtonOpacity = scrollY.interpolate({
    inputRange: [0, 10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const renderRightActions = (progress, dragX, id) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity onPress={() => deleteTask(id)} style={styles.deleteButton}>
        <Animated.Text style={[styles.deleteText, { transform: [{ scale }] }]}>
          <Ionicons name="trash" size={30} color="#ffff" />
        </Animated.Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        data={sortedtasks}
        keyExtractor={(item, index) => item?.id ?? index.toString()}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
            <TouchableOpacity onPress={() => toggleDone(item.id)} style={styles.taskWrapper}>
              <Text style={[styles.todo, item.done && styles.done]}>
                {item.text}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>No tasks yet</Text>}
      // contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
      />
      <Animated.View style={[styles.animatedButton, { transform: [{ translateY: addButtonTranslate }], opacity: addButtonOpacity, }]}>
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('/modal')}>
          <Text style={styles.addText}>Add Task</Text>
        </TouchableOpacity>
      </Animated.View>

    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 10 , backgroundColor:'' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  taskWrapper: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation:8, 
    marginHorizontal:5
  },
  todo: { fontSize: 18 },
  done: { textDecorationLine: 'line-through', color: 'gray' },
  addButton: {
    backgroundColor: '#222831',
    padding: 14,
    borderRadius: 6,
    marginTop: 20,
    alignItems: 'center',
  },
  addText: { color: '#fff', fontSize: 16 },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 8,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
