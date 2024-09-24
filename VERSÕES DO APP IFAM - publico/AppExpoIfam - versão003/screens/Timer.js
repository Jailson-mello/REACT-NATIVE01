import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function MealTimes() {
  const [mealTimes, setMealTimes] = useState({
    breakfast: '08:00',
    lunch: '12:00',
    snack: '15:00',
    dinner: '19:00'
  });

  const [newTime, setNewTime] = useState('');
  const [selectedMeal, setSelectedMeal] = useState('');

  const handleChangeTime = () => {
    if (!newTime.match(/^(?:[01]\d|2[0-3]):(?:[0-5]\d)$/)) {
      Alert.alert('Erro', 'O horário deve estar no formato HH:MM.');
      return;
    }

    setMealTimes(prevTimes => ({
      ...prevTimes,
      [selectedMeal]: newTime
    }));
    setNewTime('');
    setSelectedMeal('');
    scheduleNotification(newTime, selectedMeal);
  };

  const scheduleNotification = async (time, meal) => {
    const [hour, minute] = time.split(':').map(Number);
    const trigger = new Date();
    trigger.setHours(hour);
    trigger.setMinutes(minute);
    trigger.setSeconds(0);
    trigger.setMilliseconds(0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Hora do ${meal === 'breakfast' ? 'Café da manhã' : meal === 'lunch' ? 'Almoço' : meal === 'snack' ? 'Merenda da tarde' : 'Jantar'}`,
        body: 'É hora de verificar ou modificar o horário das refeições!',
      },
      trigger: trigger,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Horários das Refeições</Text>
      <View style={styles.mealContainer}>
        {Object.entries(mealTimes).map(([meal, time]) => (
          <View key={meal} style={styles.mealItem}>
            <Text style={styles.mealText}>
              {meal === 'breakfast' && 'Café da manhã'}
              {meal === 'lunch' && 'Almoço'}
              {meal === 'snack' && 'Merenda da tarde'}
              {meal === 'dinner' && 'Jantar'}: {time}
            </Text>
            <Button title="Alterar" onPress={() => setSelectedMeal(meal)} />
          </View>
        ))}
      </View>
      {selectedMeal && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            value={newTime}
            onChangeText={setNewTime}
          />
          <Button title="Alterar Horário" onPress={handleChangeTime} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  mealContainer: {
    width: '100%',
  },
  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  mealText: {
    fontSize: 18,
  },
  inputContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    width: '80%',
    marginBottom: 10,
    fontSize: 18,
  },
});
