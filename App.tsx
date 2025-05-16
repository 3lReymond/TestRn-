import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ImageBackground,
} from 'react-native';

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // fondo semi-transparente
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
  text: {
    fontSize: 16,
    color: '#fff',
  },
  textDone: {
    fontSize: 16,
    color: '#d3d3d3',
    textDecorationLine: 'line-through',
  },
  whitetext: {
    fontSize: 16,
    color: '#FFF',
  },
  TextInput: {
    borderColor: '#6f6f6f',
    borderWidth: 1,
    width: Dimensions.get('screen').width * 0.6,
    borderRadius: 15,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  inpuntContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    width: Dimensions.get('screen').width * 0.25,
    backgroundColor: '#5897fb',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  scrollContainer: {
    marginTop: 30,
  },
  itemContainer: {
    paddingVertical: 20,
    borderBottomColor: '#6f6f6f',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
  },
});

const tasks = [
  {
    title: 'Mandar los avances',
    done: false,
    date: new Date(),
  },
  {
    title: 'Salir a correr',
    done: false,
    date: new Date(),
  },
  {
    title: 'Nueva Tarea',
    done: true,
    date: new Date(),
  },
];

interface Task {
  title: string;
  done: boolean;
  date: Date;
}

export default function App() {
  function renderItem({ item }: { item: Task }) {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity>
          <Text style={item.done ? styles.textDone : styles.text}>
            {item.title}
          </Text>
          <Text style={item.done ? styles.textDone : styles.text}>
            {item.date ? item.date.toLocaleDateString() : 'Sin fecha'}
          </Text>
        </TouchableOpacity>
        {item.done && (
          <TouchableOpacity style={styles.removeButton}>
            <Text style={styles.whitetext}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('./ing/RN_ing.jpg')}
      style={styles.fondo}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mis pendientes por hacer</Text>

        <View style={styles.inpuntContainer}>
          <TextInput
            placeholder="Agregar una nueva tarea"
            placeholderTextColor="#6f6f6f"
            style={styles.TextInput}
          />
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.whitetext}>Agregar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.scrollContainer}>
          <FlatList renderItem={renderItem} data={tasks} />
        </View>
      </View>
    </ImageBackground>
  );
}
