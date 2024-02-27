import React, { useEffect, useState } from 'react';
import {ScrollView, Text, TouchableOpacity} from 'react-native';
import {  Card, Button } from 'react-native-paper';
import FormatDate from "../../components/guards/FormatDate";
import {Style} from "../../components/Style";
import {httpClient} from "../../utils/httpClient";

const GuardianshipsPage = ({ navigation }) => {

    const [guardianshipsList, setGuardianshipsList] = useState([]);
    useEffect(() => {
        // Appel API pour récupérer les gardes
        httpClient.get('/guardianships')
            .then(response => {
                const guardsData = response.data;
                // Appel API pour récupérer les plantes
              httpClient.get('/plants')
                    .then(response => {
                        const plantsData = response.data;
                        // Appel API pour récupérer les users
                      httpClient.get('/users')
                            .then(response => {
                                const usersData = response.data;
                                // Associez chaque garde à une plante
                                const updatedGuards = guardsData.map(guard => {
                                    const plant = plantsData.find(plant => plant.id === guard.plantId);
                                    const guardian = usersData.find(guardian => guardian.id === guard.guardianId);
                                    const owner  = usersData.find(owner => owner.id === guard.ownerId);
                                    return {...guard, plant: plant, guardian: guardian, owner: owner}; // Ajoutez la plante associée à chaque garde
                                });
                                setGuardianshipsList(updatedGuards);
                            })
                            .catch(error => {
                                console.error('Erreur lors de la récupération des users :', error);
                            })
                    })
                    .catch(error => {
                        console.error('Erreur lors de la récupération des plantes :', error);
                    })
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des gardes :', error);
            });
    }, []);

    return (
        <ScrollView style={Style.container}>
            {guardianshipsList.map((guardianships, index) => (
                <Card key={index} style={Style.card}>
                  <TouchableOpacity
                    title={guardianships.name}
                    onPress={() => navigation.navigate('Guard', {guardId: guardianships.id})}>
                    <Text title={guardianships.title}
                          style={Style.title}
                          onPress={() => navigation.navigate('guard', {guardId: guardianships.id})}>
                      {guardianships.title}</Text>
                    <Text style={Style.bulletPoint}>Propriétaire : {guardianships.owner.username}</Text>
                    {guardianships.guardian ? (
                      <Text style={Style.bulletPoint}>Gardé par : { guardianships.guardian.username } </Text>) : (
                        <Button style={Style.button}>Me proposer en tant que gardien </Button>
                    )}
                    <Text style={Style.bulletPoint}>Plante associée : {guardianships.plant.name} </Text>
                    <Text style={Style.bulletPoint}>Date de début de la garde : <FormatDate date={guardianships.startDate}/></Text>
                    <Text style={Style.bulletPoint}>Date de fin de la garde : <FormatDate date={guardianships.endDate}/></Text>
                  </TouchableOpacity>
                </Card>
            ))}

        <Button
          style={Style.button}
            title="Ajouter"
            onPress={() => navigation.navigate('AddGuard')}
        >Ajouter garde</Button>
        </ScrollView>
    );

}

export default GuardianshipsPage