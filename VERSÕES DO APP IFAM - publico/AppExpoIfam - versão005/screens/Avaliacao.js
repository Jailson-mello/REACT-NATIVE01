/**VERSÃO 00 */


import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../src/Firebase.config'; // Importar a configuração do Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importar funções do Firestore

const Avaliacao = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState({});
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o modal

  const handleSuggestionPress = (suggestion) => {
    setSelectedSuggestions((prevState) => ({
      ...prevState,
      [suggestion]: !prevState[suggestion],
    }));
  };

  const handleSubmit = async () => {
    // Verificar se a avaliação está vazia
    if (rating === 0 && comment === '' && Object.keys(selectedSuggestions).length === 0) {
      Alert.alert("Atenção", "Preencha o formulário.");
      return;
    }

    try {
      // Enviar dados para o Firestore
      await addDoc(collection(db, 'avaliacoes'), {
        rating,
        comment,
        suggestions: selectedSuggestions,
        createdAt: new Date(), // Adiciona a data da avaliação
      });

      // Limpar os campos após o envio
      setRating(0);
      setComment('');
      setSelectedSuggestions({});
      
      // Exibir o modal de agradecimento
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao enviar avaliação: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar sua avaliação. Tente novamente.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Avalie Nossa Experiência</Text>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <MaterialIcons
              name={star <= rating ? "star" : "star-border"}
              size={40}
              color={star <= rating ? "#FFD700" : "#ddd"}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Digite seu feedback aqui... (opcional)"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.suggestionsTitle}>Sugestões de Melhoria:</Text>
      {['Atendimento', 'Qualidade da Comida', 'Variedade do Cardápio'].map((suggestion, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.suggestionButton,
            selectedSuggestions[suggestion] && styles.suggestionButtonSelected,
          ]}
          onPress={() => handleSuggestionPress(suggestion)}
        >
          <Text
            style={[
              styles.suggestionText,
              selectedSuggestions[suggestion] && styles.suggestionTextSelected,
            ]}
          >
            {suggestion}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
      </TouchableOpacity>

      {/* Modal de agradecimento */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Obrigado!</Text>
            <Text style={styles.modalMessage}>Sua avaliação é importante para nós.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  commentInput: {
    height: 100,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#495057',
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343a40',
  },
  suggestionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    alignItems: 'center',
  },
  suggestionButtonSelected: {
    backgroundColor: '#FFD700',
  },
  suggestionText: {
    fontSize: 16,
    color: '#495057',
  },
  suggestionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Avaliacao;







/**VERSÃO 01 */

/*
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Modal, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../src/Firebase.config'; // Importar a configuração do Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importar funções do Firestore

const Avaliacao = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState({});
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar o modal

  const handleSuggestionPress = (suggestion) => {
    setSelectedSuggestions((prevState) => ({
      ...prevState,
      [suggestion]: !prevState[suggestion],
    }));
  };

  const handleSubmit = async () => {
    // Verificar se a avaliação está vazia
    if (rating === 0 && comment === '' && Object.keys(selectedSuggestions).length === 0) {
      Alert.alert("Atenção", "Preencha a avaliação antes de enviar.");
      return;
    }

    try {
      // Enviar dados para o Firestore
      await addDoc(collection(db, 'avaliacoes'), {
        rating,
        comment,
        suggestions: selectedSuggestions,
        createdAt: new Date(), // Adiciona a data da avaliação
      });

      // Limpar os campos após o envio
      setRating(0);
      setComment('');
      setSelectedSuggestions({});
      
      // Exibir o modal de agradecimento
      setModalVisible(true);
    } catch (error) {
      console.error("Erro ao enviar avaliação: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar sua avaliação. Tente novamente.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Avalie Nossa Experiência</Text>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <MaterialIcons
              name={star <= rating ? "star" : "star-border"}
              size={40}
              color={star <= rating ? "#FFD700" : "#ddd"}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Digite seu feedback aqui... (opcional)"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.suggestionsTitle}>Sugestões de Melhoria:</Text>
      {['Atendimento', 'Qualidade da Comida', 'Variedade do Cardápio'].map((suggestion, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.suggestionButton,
            selectedSuggestions[suggestion] && styles.suggestionButtonSelected,
          ]}
          onPress={() => handleSuggestionPress(suggestion)}
        >
          <Text
            style={[
              styles.suggestionText,
              selectedSuggestions[suggestion] && styles.suggestionTextSelected,
            ]}
          >
            {suggestion}
          </Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
      </TouchableOpacity>

    
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Obrigado!</Text>
            <Text style={styles.modalMessage}>Sua avaliação é importante para nós.</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  commentInput: {
    height: 100,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#495057',
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343a40',
  },
  suggestionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
    alignItems: 'center',
  },
  suggestionButtonSelected: {
    backgroundColor: '#FFD700',
  },
  suggestionText: {
    fontSize: 16,
    color: '#495057',
  },
  suggestionTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semi-transparente
  },
  modalContent: {
    width: 300,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Avaliacao;

 */









/**VERSÃO 02 */


/*

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../src/Firebase.config'; // Importar a configuração do Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importar funções do Firestore

const Avaliacao = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState({}); // Armazena os valores selecionados para cada sugestão

  const handleSuggestionSelect = (suggestion, value) => {
    setSelectedSuggestions((prevState) => ({
      ...prevState,
      [suggestion]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Enviar dados para o Firestore
      await addDoc(collection(db, 'avaliacoes'), {
        rating,
        comment,
        selectedSuggestions,
        createdAt: new Date(), // Adiciona a data da avaliação
      });

      // Limpar os campos após o envio
      setRating(0);
      setComment('');
      setSelectedSuggestions({});
      
      // Mensagem de sucesso
      Alert.alert("Sucesso", "Avaliação enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar avaliação: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar sua avaliação. Tente novamente.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Avalie Nossa Experiência</Text>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <MaterialIcons
              name={star <= rating ? "star" : "star-border"}
              size={40}
              color={star <= rating ? "#FFD700" : "#ddd"}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Digite seu feedback aqui... (opcional)"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
      />


      <Text style={styles.suggestionsTitle}>Sugestões de Melhoria:</Text>
      {['Atendimento', 'Qualidade da Comida', 'Variedade do Cardápio'].map((suggestion, index) => (
        <View key={index} style={styles.suggestionContainer}>
          <Text style={styles.checkboxText}>{suggestion}</Text>
          <View style={styles.buttonGroup}>
            {['Bom', 'Regular', 'Ruim'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedSuggestions[suggestion] === option && styles.selectedOptionButton
                ]}
                onPress={() => handleSuggestionSelect(suggestion, option)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedSuggestions[suggestion] === option && styles.selectedOptionButtonText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}


      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  commentInput: {
    height: 100,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#495057',
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343a40',
    textAlign: 'center'
  },
  suggestionContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  checkboxText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  optionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#495057',
  },
  selectedOptionButton: {
    backgroundColor: '#FFD700',
  },
  selectedOptionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Avaliacao;
 
*/







/**VERSÃO 03*/


/*
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { db } from '../src/Firebase.config'; // Importar a configuração do Firebase
import { collection, addDoc } from 'firebase/firestore'; // Importar funções do Firestore

const Avaliacao = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState({}); // Armazena os valores selecionados para cada sugestão

  const handleSuggestionSelect = (suggestion, value) => {
    setSelectedSuggestions((prevState) => ({
      ...prevState,
      [suggestion]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'avaliacoes'), {
        rating,
        comment,
        selectedSuggestions,
        createdAt: new Date(),
      });

      setRating(0);
      setComment('');
      setSelectedSuggestions({});
      
      Alert.alert("Sucesso", "Avaliação enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar avaliação: ", error);
      Alert.alert("Erro", "Ocorreu um erro ao enviar sua avaliação. Tente novamente.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Avalie Nossa Experiência</Text>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setRating(star)}>
            <MaterialIcons
              name={star <= rating ? "star" : "star-border"}
              size={40}
              color={star <= rating ? "#FFD700" : "#ddd"}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.commentInput}
        placeholder="Digite seu feedback aqui... (opcional)"
        value={comment}
        onChangeText={setComment}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.suggestionsTitle}>Sugestões de Melhoria:</Text>
      {['Atendimento', 'Qualidade da Comida', 'Variedade do Cardápio'].map((suggestion, index) => (
        <View key={index} style={styles.suggestionContainer}>
          <Text style={styles.checkboxText}>{suggestion}</Text>
          <View style={styles.buttonGroup}>
            {['Bom', 'Regular', 'Ruim'].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedSuggestions[suggestion] === option && styles.selectedOptionButton
                ]}
                onPress={() => handleSuggestionSelect(suggestion, option)}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    selectedSuggestions[suggestion] === option && styles.selectedOptionButtonText
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Enviar Avaliação</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#343a40',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  commentInput: {
    height: 100,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
    fontSize: 16,
    color: '#495057',
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#343a40',
  },
  suggestionContainer: {
    marginBottom: 15,
  },
  checkboxText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  optionButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 5,
    marginVertical: 3,
    backgroundColor: '#fff',
    width: 100, // Garantir que os botões tenham um tamanho uniforme
    alignItems: 'center',
  },
  optionButtonText: {
    fontSize: 14,
    color: '#495057',
  },
  selectedOptionButton: {
    backgroundColor: '#FFD700',
  },
  selectedOptionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Avaliacao;













*/
