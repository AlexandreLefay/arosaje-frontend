import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Button, Card, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import HomeImage from './home-image.jpg';
import {useEffect, useState} from "react";
import {UserData} from "../../utils/UserData";
import {httpClient} from "../../utils/httpClient";



function HomeScreen() {
    const[user, setUser] = useState(null)
    useEffect( () => {
        setUser(UserData())
        console.log(httpClient)
    }, []);


    const navigation = useNavigation();
    return (
        <ScrollView style={styles.container}>
            <Card style={styles.card}>
                <Card.Cover source={HomeImage}/>
                <Card.Content>
                    <Text style={styles.title}>Bienvenue sur A'rosa-je {user ? user.username : ''} !</Text>
                    <Text style={styles.paragraph}>
                        Arosaje est votre application du quotidien pour vous aider à soigner vos plantes.
                    </Text>
                </Card.Content>
            </Card>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.heading}>Fonctionnalités Clés :</Text>
                    <Text style={styles.bulletPoint}>• Sauvegardez vos plantes avec leurs plus belles photos.</Text>
                    <Text style={styles.bulletPoint}>• Créez un ticket pour demander de l'aide à notre communauté afin
                        de prendre soin de vos plantes de la meilleure façon.</Text>
                    <Text style={styles.bulletPoint}>• Faites une demande de garde : vous partez en vacances ou
                        souhaitez simplement que votre plante soit chouchoutée ? Laissez-la entre les mains d'un membre
                        de notre communauté.</Text>
                </Card.Content>
            </Card>
            <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('AddPlant')}>
                Commencer maintenant
            </Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#f5f5f5',
    },
    card: {
        marginBottom: 16,
        elevation: 4,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
        shadowOpacity: 0.25,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 12,
        marginBottom: 8,
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    bulletPoint: {
        fontSize: 16,
        lineHeight: 24,
    },
    button: {
        backgroundColor: '#42a83e',
        paddingVertical: 8,
        marginHorizontal: 16,
        marginBottom: 16,
    },
});

export default HomeScreen;
