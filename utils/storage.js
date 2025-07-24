import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'todos';

export const loadTask = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error loading todos:', e);
    return [];
  }
};

export const saveTasks = async (todos) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    console.error('Error saving todos:', e);
  }
};
