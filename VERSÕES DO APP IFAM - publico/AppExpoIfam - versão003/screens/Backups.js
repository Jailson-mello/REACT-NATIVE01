import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import React from 'react';

export default function Backups() {

  const handleCreateBackup = () => {
    // Lógica para criar um backup
    Alert.alert("Backup", "Backup criado com sucesso!");
  };

  const handleRestoreBackup = () => {
    // Lógica para restaurar um backup
    Alert.alert("Restaurar Backup", "Backup restaurado com sucesso!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Backups</Text>
      <Text style={styles.info}>
        Faça backups regulares dos seus dados para garantir que nada seja perdido.
      </Text>
      <Button
        title="Criar Backup"
        onPress={handleCreateBackup}
        style={styles.button}
      />
      <Button
        title="Restaurar Backup"
        onPress={handleRestoreBackup}
        style={styles.button}
      />
      <Text style={styles.footer}>
        Último backup: 01/01/2024
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    margin: 10,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: '#888',
  },
});
