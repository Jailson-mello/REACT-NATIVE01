import { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { SimpleLineIcons, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerItemList } from '@react-navigation/drawer';
import * as ImagePicker from 'expo-image-picker'; // Importa o ImagePicker
import User from "../assets/user02.jpg"; // Imagem padrão
import Backups from "../screens/Backups";
import Categories from "../screens/Categories";
import Contact from "../screens/Contact";
import Customize from "../screens/Customize";
import GetPremium from "../screens/GetPremium";
import RateApp from "../screens/RateApp";
import Settings from "../screens/Settings";
import Timer from "../screens/Timer";
import { auth } from '../src/Firebase.config';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';

const Drawer = createDrawerNavigator();

export default function Home() {
  const [profileImage, setProfileImage] = useState(User); // Estado para a imagem do perfil
  const currentUser = auth.currentUser;
  const router = useRouter();

  if (currentUser == null) {
    alert('É necessário estar logado para utilizar este recurso!');
    router.replace('/');
  }

  async function pickImage() {
    // Solicita permissão para acessar a galeria de fotos
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Desculpe, precisamos da permissão para acessar a galeria!');
      return;
    }

    // Abre a galeria de fotos
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage({ uri: result.uri }); // Atualiza a imagem do perfil
    }
  }

  function logout() {
    signOut(auth)
      .then(() => {
        alert("Você desconectou-se do sistema!");
        router.replace('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <SafeAreaView style={localStyles.drawerContent}>
          <View style={localStyles.profileContainer}>
            <Pressable onPress={pickImage} style={localStyles.profileImageContainer}>
              <Image
                source={profileImage}
                style={localStyles.profileImage}
              />
              <MaterialIcons name="camera-alt" size={24} color="#fff" style={localStyles.cameraIcon} />
            </Pressable>
            <Text style={localStyles.profileName}>{currentUser?.email || 'Nome não disponível'}</Text>
            <Text style={localStyles.profileEmail}>{currentUser?.email || 'E-mail não disponível'}</Text>
          </View>
          <DrawerItemList {...props} />
          <Pressable style={localStyles.logoutButton} onPress={logout}>
            <MaterialIcons name="logout" size={24} color="#fff" />
            <Text style={localStyles.logoutButtonText}>Logout</Text>
          </Pressable>
        </SafeAreaView>
      )}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 250
        },
        headerStyle: {
          backgroundColor: "green", // cor do header
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerActiveTintColor: "blue",
        drawerLabelStyle: {
          color: "#111"
        }
      }}
    >
      <Drawer.Screen
        name="Timer"
        component={Timer}
        options={{
          drawerLabel: "Timer",
          title: "Timer",
          drawerIcon: () => (
            <MaterialIcons name="timer" size={20} color="#808080" />
          )
        }}
      />
      <Drawer.Screen
        name="Categories"
        component={Categories}
        options={{
          drawerLabel: "Categories",
          title: "Categories",
          drawerIcon: () => (
            <MaterialIcons name="category" size={20} color="#808080" />
          )
        }}
      />
      <Drawer.Screen
        name="Customize"
        component={Customize}
        options={{
          drawerLabel: "Customize",
          title: "Customize",
          drawerIcon: () => (
            <SimpleLineIcons name="dashboard-customize" size={20} color="#808080" />
          )
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerLabel: "Settings",
          title: "Settings",
          drawerIcon: () => (
            <SimpleLineIcons name="settings" size={20} color="#808080" />
          )
        }}
      />
      <Drawer.Screen
        name="Backups"
        component={Backups}
        options={{
          drawerLabel: "Backups",
          title: "Backups",
          drawerIcon: () => (
            <MaterialIcons name="backup" size={20} color="#808080" />
          )
        }}
      />
      <Drawer.Screen
        name="Get Premium"
        component={GetPremium}
        options={{
          drawerLabel: "Get Premium",
          title: "Get Premium",
          drawerIcon: () => (
            <MaterialIcons name="certificate" size={20} color="#808080" />
          )
        }}
      />
      <Drawer.Screen
        name="Rate this App"
        component={RateApp}
        options={{
          drawerLabel: "Rate this App",
          title: "Rate this App",
          drawerIcon: () => (
            <MaterialIcons name="star" size={20} color="#808080" />
          )
        }}
      />
      <Drawer.Screen
        name="Contact"
        component={Contact}
        options={{
          drawerLabel: "Contact",
          title: "Contact",
          drawerIcon: () => (
            <MaterialIcons name="envelope" size={20} color="#808080" />
          )
        }}
      />
    </Drawer.Navigator>
  );
}

const localStyles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  profileContainer: {
    height: 200,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#f4f4f4",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  profileImageContainer: {
    position: 'relative', // Necessário para posicionar o ícone sobre a imagem
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 65
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)', // Fundo semitransparente para o ícone
    borderRadius: 20,
    padding: 5
  },
  profileName: {
    fontSize: 22,
    marginVertical: 6,
    fontWeight: "bold",
    color: "#111"
  },
  profileEmail: {
    fontSize: 16,
    color: "#111"
  },
  logoutButton: {
    flexDirection: 'row', // Alinha o ícone e o texto horizontalmente
    alignItems: 'center', // Alinha o ícone e o texto verticalmente
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'green', // cor do botão
    justifyContent: 'center'
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#fff', // cor do texto
    marginLeft: 10 // Espaço entre o ícone e o texto
  }
});
