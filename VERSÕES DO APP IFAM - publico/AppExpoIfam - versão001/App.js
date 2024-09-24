import { useState } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, StyleSheet, View, TextInput } from 'react-native';
import { styles } from './src/styles';
import { auth } from './src/Firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function App() {
  const [userMail,setUserMail] = useState('');
  const [userPass,setUserPass] = useState('');


  function userLogin(){
    signInWithEmailAndPassword(auth, userMail, userPass)
    .then((userCredential) => {
      const user = userCredential.user;
      alert ('Login Efetuado');
      console.log(user);
    })
    .catch ((error) => {
      const user = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    })
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>LOGIN NO SISTEMA</Text>
      <TextInput style={styles.formImput}
        placeholder="Informe o E-mail"
        KeyboardType="Endereço de E-mail"
        autoCapitalize="none"
        autoComplete="email"
        value={userMail}
        onChangeText={setUserMail}
      />
      <TextInput style={styles.formImput}
        placeholder="Informe a senha"
        autoCapitalize="none"
        secureTextEntry
        value={userPass}
        onChangeText={setUserPass}
      />
      <Pressable style={styles.formButton}
        onPress={userLogin}
      >
        <Text style={styles.textButton}>Logar</Text>
      </Pressable>
      <View style={styles.subContainer}>
        <Pressable style={styles.subButton}>
          <Text style={styles.subTextButton}>Esqueci a senha</Text>
        </Pressable>
        <Pressable>
          <Text style={styles.subTextButton}>Novo Usuário</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

