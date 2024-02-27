import React, {useCallback, useState} from 'react';
import {Alert, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {AntDesign} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {httpClient} from "../../utils/httpClient";

const TicketScreen = () => {
    const navigation = useNavigation();
    const [tickets, setTickets] = useState([]);

    const fetchTickets = async () => {
        const currentUser = JSON.parse(await AsyncStorage.getItem('CURRENT_USER'));
        httpClient.get(`/tickets/user/${currentUser.userId}`)
            .then((response) => {
                setTickets(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useFocusEffect(
        useCallback(() => {
            fetchTickets();
        }, [])
    );

    const deleteTicket = (ticketId) => {
        Alert.alert(
            "Supprimer le ticket",
            "Êtes-vous sûr de vouloir supprimer ce ticket ?",
            [
                {text: "Annuler", style: "cancel"},
                {
                    text: "Supprimer", onPress: () => {
                        httpClient.delete(`/tickets/${ticketId}`)
                            .then(() => {
                                setTickets(tickets.filter(ticket => ticket.id !== ticketId));
                            })
                            .catch((error) => {
                                console.error(error);
                                Alert.alert("Erreur", "Impossible de supprimer ce ticket.");
                            });
                    }
                },
            ]
        );
    };

    const TicketCard = ({item}) => (
        <View style={styles.cardContainer}>
            <View style={styles.ticketCard}>
                <View style={styles.cardHeader}>
                    <Text style={styles.ticketName}>{item.title}</Text>
                    <TouchableOpacity onPress={() => deleteTicket(item.id)}>
                        <AntDesign name="closecircle" size={24} color="red"/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.ticketDescription}>{item.description}</Text>
            </View>
        </View>
    );

    const renderItem = ({item}) => <TicketCard item={item}/>;

    const CustomHeader = () => (
        <View style={styles.customHeader}>
            <Text style={styles.headerTitle}>Mes Tickets</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddTicket')}>
                <AntDesign name="pluscircle" size={24} color="#000"/>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{flex: 1}}>
            <CustomHeader/>
            {tickets.length > 0 ? (
                <FlatList
                    data={tickets}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    contentContainerStyle={styles.container}
                />
            ) : (
                <Text style={styles.loadingText}>Chargement...</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8', // Modifier selon le thème de votre app
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardContainer: {
        flex: 1,
        width: '50%',
        padding: 5,
    },
    ticketCard: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 2,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    ticketName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ticketDescription: {
        fontSize: 14,
        textAlign: 'center',
    },
    loadingText: {
        textAlign: 'center',
        marginTop: 20,
    },
});

export default TicketScreen;
