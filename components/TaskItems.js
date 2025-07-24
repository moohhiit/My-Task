import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TaskItems({ item, toggleDone, deleteTodo }) {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => toggleDone(item.id)}
        style={styles.textContainer}
      >
        <Text style={[styles.text, item.done && styles.done]}>
          {item.text}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteTodo(item.id)}>
        <Text style={styles.delete}>🗑</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
  },
  textContainer: { flex: 1 },
  text: { fontSize: 18 },
  done: { textDecorationLine: 'line-through', color: 'gray' },
  delete: { fontSize: 18, paddingHorizontal: 10 },
});
