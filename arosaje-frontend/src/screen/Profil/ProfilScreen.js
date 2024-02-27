import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Avatar, Card, Paragraph, Text, Title} from 'react-native-paper';
import DefaultProfileImg from './defaultProfile.jpg';
import {httpClient} from "../../utils/httpClient";

function ProfilScreen() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpClient.get('/users/1');
                setUserData(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données de l'utilisateur", error);
            }
        };

        fetchData();
    }, []);

    if (!userData) return <Text>Chargement du profil...</Text>;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.profileHeader}>
                <Avatar.Image
                    size={140}
                    source={userData.photo ? {uri: userData.photo} : DefaultProfileImg}
                    style={styles.avatar}
                />
                <Title style={styles.name}>{`${userData.firstname} ${userData.lastname}`}</Title>
            </View>
            <Card style={styles.card}>
                <Card.Content>
                    <Paragraph style={styles.paragraph}>Email: {userData.email}</Paragraph>
                    <Paragraph style={styles.paragraph}>Téléphone: {userData.phone}</Paragraph>
                    <Paragraph
                        style={styles.paragraph}>Adresse: {`${userData.address.street}, ${userData.address.city} ${userData.address.zip}`}</Paragraph>
                    <Paragraph
                        style={styles.paragraph}>Rôle: {userData.roles.map(role => role.name).join(', ')}</Paragraph>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#f5f5f5',
    },
    profileHeader: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatar: {
        marginBottom: 8,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    card: {
        margin: 4,
        elevation: 4,
        shadowRadius: 2,
        shadowOpacity: 0.1,
    },
    paragraph: {
        marginBottom: 10,
    },
});

export default ProfilScreen;
