import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {httpClient} from "../../utils/httpClient";

const CreateTicketScreen = ({navigation}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = async () => {
        const currentUser = JSON.parse(await AsyncStorage.getItem('CURRENT_USER'));
        const userId = currentUser.userId;
        console.log(userId);

        if (!title || !description) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
            return;
        }

        try {
            const response = await httpClient.post('/tickets', {
                title,
                description,
                userId,
            });
            Alert.alert('Succès', 'Ticket créé avec succès.');
            navigation.goBack();
        } catch (error) {
            console.error(error);
            Alert.alert('Erreur', "Une erreur s'est produite lors de la création du ticket.");
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Titre"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
            />
            <Button
                title="Soumettre le ticket"
                onPress={handleSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    input: {
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
});

export default CreateTicketScreen;
