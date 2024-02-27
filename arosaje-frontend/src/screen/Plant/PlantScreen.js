import React, {useCallback, useState} from 'react';
import {Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {AntDesign} from '@expo/vector-icons';
import {Card} from 'react-native-paper';
import {httpClient} from "../../utils/httpClient";

const PlantScreen = () => {
    const navigation = useNavigation();
    const [plants, setPlants] = useState([]);

    useFocusEffect(
        useCallback(() => {
            httpClient.get( '/plants/user/1')
                .then((response) => {
                    const updatedPlants = response.data.map(plant => ({
                        ...plant,
                        imageBlob: plant.photos && plant.photos.length > 0
                            ? `data:image/jpeg;base64,${plant.photos[0].imageBlob}`
                            : null
                    }));
                    setPlants(updatedPlants);
                })
                .catch((error) => {
                    console.error(error);
                });
        }, [])
    );

    const deletePlant = (plantId) => {
        Alert.alert(
            "Supprimer la plante",
            "Êtes-vous sûr de vouloir supprimer cette plante ?",
            [
                {
                    text: "Annuler",
                    style: "cancel"
                },
                {
                    text: "Supprimer",
                    onPress: () => {
                        console.log(plantId);
                        httpClient.delete( `/plants/${plantId}`)
                            .then(() => {
                                setPlants(plants.filter(plant => plant.id !== plantId));
                            })
                            .catch((error) => {
                                console.error(error);
                                Alert.alert("Erreur", "Problème lors de la suppression de la plante.");
                            });
                    }
                }
            ]
        );
    };

    const renderPlant = ({item: plant}) => (
        <View style={styles.cardContainer}>
            <Card style={styles.plantCard}>
                <Image source={{uri: plant.imageBlob || undefined}} style={styles.plantImage}/>
                <Card.Content>
                    <Text style={styles.plantName}>{plant.name} ({plant.species})</Text>
                    <Text style={styles.plantCare}>{plant.careInstructions}</Text>
                </Card.Content>
            </Card>
            <TouchableOpacity style={styles.deleteIcon} onPress={() => deletePlant(plant.id)}>
                <AntDesign name="closecircle" size={24} color="red"/>
            </TouchableOpacity>
        </View>
    );

    const CustomHeader = () => (
        <View style={styles.customHeader}>
            <Text style={styles.headerTitle}>Mes Plantes</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AddPlant')}>
                <AntDesign name="pluscircle" size={24} color="#000"/>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={{flex: 1}}>
            <CustomHeader/>
            <FlatList
                data={plants}
                renderItem={renderPlant}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.container}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 8,
        paddingTop: 8,
    },
    customHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f8f8f8',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    cardContainer: {
        position: 'relative',
        flex: 1,
        margin: 4,
    },
    plantCard: {
        elevation: 2,
        borderRadius: 8,
        // overflow: 'hidden',
    },
    plantImage: {
        height: 150,
        resizeMode: 'cover',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    plantName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    plantCare: {
        fontSize: 14,
        color: '#666',
    },
    deleteIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 2,
    },
});

export default PlantScreen;
