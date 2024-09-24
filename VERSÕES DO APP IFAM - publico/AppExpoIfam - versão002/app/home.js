import { Pressable, Text, View } from 'react-native';
import { styles } from '../src/styles';
import { auth } from '../src/Firebase.config';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';

export default function Home(){
    const currentUser = auth.currentUser;
    const router = useRouter();

    if(currentUser != null) {
        //alert('logado');
    } else {
        alert('É necessário estar logado para utilizar este recurso!');
        router.replace('/');
    }

    function logout(){
        signOut(auth)
        .then(() => {
            alert("Você desconectou-se do sistema!");
            router.replace('/');
        })
        .catch((error) => {
            const errorMessage = error.errorMessage;
            alert(errorMessage);
        });

    }

    return(
        <View style={styles.internalContainer}>
            <View style={styles.topBar}>
                <Pressable onPress={logout}>
                     <Text style={styles.topBarButtonText}>Logout</Text>
                </Pressable>
            </View>
            <Text style={styles.formTitle}>Página Inicial</Text>
        </View>
    );
}

