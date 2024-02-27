import * as React from 'react';
import {Button, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from "axios";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";

import AppLogo from './logo.png';
import {apiIp} from "../../utils/config";

function LoginScreen() {
    const navigation = useNavigation();
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const navigateToHome = () => {
        navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
        });
    };

    const handleSubmit = () => {
        axios.post(apiIp+'/login', {username, password})
            .then(response => {
                const currentUser = response.data
                currentUser['jwt']= response.headers['x-authorization']

                if (response.data.userId) {

                AsyncStorage.setItem('CURRENT_USER', JSON.stringify(currentUser)).then(() => {
                        navigateToHome();
                    });
                } else {
                    Alert.alert("Erreur", "Nom d'utilisateur ou mot de passe incorrect.");
                }
            })
            .catch(error => {
                console.error(error);
                Alert.alert("Erreur", "Nom d'utilisateur ou mot de passe incorrect.");
            });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flex: 1, backgroundColor: '#ffffff'}}
        >
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={styles.container}>
                    <StatusBar barStyle="dark-content"/>
                    <View style={styles.logoContainer}>
                        <Image source={AppLogo} style={styles.logo}/>
                        <Text style={styles.appName}>Arosaje</Text>
                    </View>
                    <TextInput
                        label="Username"
                        value={username}
                        onChangeText={setUsername}
                        mode="outlined"
                        theme={{colors: {primary: '#42a83e', underlineColor: 'transparent'}}}
                        style={styles.input}
                    />
                    <TextInput
                        label="Mot de passe"
                        value={password}
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        mode="outlined"
                        theme={{colors: {primary: '#42a83e', underlineColor: 'transparent'}}}
                        style={styles.input}
                    />
                    <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                        Se connecter
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#ffffff',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 200,
        height: 200,
    },
    appName: {
        marginTop: 10,
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        marginBottom: 15,
    },
    button: {
        marginTop: 10,
        paddingVertical: 2,
        backgroundColor: '#42a83e',
    },
});

export default LoginScreen;
