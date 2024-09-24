import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, View, TextInput, Image, Platform } from 'react-native';
import { styles } from '../src/styles';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'expo-router';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAJ7fLm9Sw5i2RdwfB19gZmDhrtspTJqVk",
  authDomain: "login-projeto-ifam.firebaseapp.com",
  projectId: "login-projeto-ifam",
  storageBucket: "login-projeto-ifam.appspot.com",
  messagingSenderId: "720051361377",
  appId: "1:720051361377:web:1d28b3e8b49c7b9f4c3c20"
  //720051361377-tfkt4j2kh4hv4ie21i57p0h7epd09pvd.apps.googleusercontent.com
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function App() {
  const [userMail, setUserMail] = useState('');
  const [userPass, setUserPass] = useState('');
  const router = useRouter();

  // Configuração do Google Auth Request
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: Platform.select({
      ios: '881013961278-k1h7b2j3g9rv0g9qbt6f324a1u93eeff.apps.googleusercontent.com', // Atualize com seu ID correto
      android: '881013961278-k1h7b2j3g9rv0g9qbt6f324a1u93eeff.apps.googleusercontent.com', // Atualize com seu ID correto
    }),
    redirectUri: AuthSession.makeRedirectUri({
      useProxy: true, // Use o proxy para desenvolvimento no Expo
    }),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          router.replace('/home');
        })
        .catch((error) => {
          console.error('Erro ao autenticar com Google:', error);
          alert('Erro ao fazer login com o Google');
        });
    }
  }, [response]);

  const handleGoogleSignIn = async () => {
    try {
      await promptAsync();
    } catch (error) {
      console.error('Erro ao iniciar o Google Sign-In:', error);
      alert('Erro ao iniciar o Google Sign-In');
    }
  };

  const userLogin = () => {
    signInWithEmailAndPassword(auth, userMail, userPass)
      .then(() => {
        router.replace('/home');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>LOGIN NO SISTEMA</Text>
      <TextInput 
        style={styles.formImput}
        placeholder="Informe o E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={userMail}
        onChangeText={setUserMail}
      />
      <TextInput 
        style={styles.formImput}
        placeholder="Informe a senha"
        autoCapitalize="none"
        secureTextEntry
        value={userPass}
        onChangeText={setUserPass}
      />
      <Pressable style={styles.formButton} onPress={userLogin}>
        <Text style={styles.textButton}>Logar</Text>
      </Pressable>
      <Pressable style={styles.googleButton} onPress={handleGoogleSignIn} disabled={!request}>
        <Image 
          source={require('../assets/google-icon.png')} 
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Login com Google</Text>
      </Pressable>
      <View style={styles.subContainer}>
        <Pressable style={styles.subButton}>
          <Text style={styles.subTextButton} onPress={() => router.replace('/replacePass')}>Esqueci a senha</Text>
        </Pressable>
        <Pressable style={styles.subButton}>
          <Text style={styles.subTextButton} onPress={() => router.replace('/newUser')}>Cadastrar</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
