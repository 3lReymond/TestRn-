import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Button,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  RefreshControl,
  SectionList,
  StatusBar,
  Switch,
  TouchableHighlight,
  TouchableWithoutFeedback,
  VirtualizedList,
  Keyboard,
  Platform,
} from 'react-native';

const tasks = [
  { title: 'Mandar los avances', done: false, date: new Date() },
  { title: 'Salir a correr', done: false, date: new Date() },
  { title: 'Nueva Tarea', done: true, date: new Date() },
];

const DATA_SECTIONS = [
  {
    title: 'Hoy',
    data: ['Estudiar', 'Hacer ejercicio'],
  },
  {
    title: 'Mañana',
    data: ['Leer un libro'],
  },
];

const getItem = (_: any, index: number) => ({
  id: String(index),
  title: `Elemento #${index + 1}`,
});

const getItemCount = () => 5;

export default function NuevaPantalla() {
  const [input, setInput] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previous => !previous);

  const renderItem = ({ item }: { item: typeof tasks[0] }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity>
        <Text style={item.done ? styles.textDone : styles.text}>{item.title}</Text>
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require('../ing/RN_ing.jpg')}
          style={{ flex: 1, resizeMode: 'cover', padding: 20 }}
        >
          <StatusBar barStyle="light-content" backgroundColor="#000" />

          <Text style={styles.title}>Mis pendientes por hacer</Text>

          <View style={styles.inpuntContainer}>
            <TextInput
              placeholder="Agregar una nueva tarea"
              style={styles.TextInput}
              value={input}
              onChangeText={setInput}
            />
            <TouchableOpacity style={styles.addButton} onPress={() => setInput('')}>
              <Text style={styles.whitetext}>Agregar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={() => setRefreshing(false)} />
            }
          />

          <SectionList
            sections={DATA_SECTIONS}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={[styles.title, { marginTop: 10 }]}>{title}</Text>
            )}
          />

          <VirtualizedList
            data={[]}
            initialNumToRender={4}
            renderItem={({ item }) => <Text style={styles.text}>{item.title}</Text>}
            keyExtractor={item => item.id}
            getItemCount={getItemCount}
            getItem={getItem}
          />

          <View style={{ marginTop: 20 }}>
            <Text style={styles.text}>Notificaciones</Text>
            <Switch value={isEnabled} onValueChange={toggleSwitch} />
          </View>

          <TouchableHighlight
            style={[styles.addButton, { marginTop: 20 }]}
            onPress={() => setModalVisible(true)}
            underlayColor="#447ad3"
          >
            <Text style={styles.whitetext}>Mostrar Modal</Text>
          </TouchableHighlight>

          <Image
            source={require('../ing/RN_ing.jpg')}
            style={{ width: 100, height: 100, marginTop: 20, borderRadius: 10 }}
          />

          <Pressable
            onPress={() => alert('¡Hola desde Pressable!')}
            style={[styles.addButton, { marginTop: 20 }]}
          >
            <Text style={styles.whitetext}>Presióname</Text>
          </Pressable>

          <View style={{ marginTop: 20 }}>
            <Button title="Botón Nativo" onPress={() => alert('Pulsaste el botón')} />
          </View>

          <Modal animationType="slide" visible={modalVisible} transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <Text style={styles.title}>¡Esto es un modal!</Text>
                <Button title="Cerrar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#FFF',
  },
  textDone: {
    fontSize: 16,
    color: '#AAA',
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
    backgroundColor: '#FFF',
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
    padding: 10,
  },
  itemContainer: {
    paddingVertical: 20,
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  removeButton: {
    backgroundColor: 'red',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    alignItems: 'center',
  },
});
