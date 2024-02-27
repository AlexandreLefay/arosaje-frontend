import React, { useEffect, useState } from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {  Card, } from 'react-native-paper';
import FormatDate from "../../components/guards/FormatDate";
import {Style} from "../../components/Style";
import {httpClient} from "../../utils/httpClient";


const MyGuardsPage = ({ navigation }) => {

    const [guardsList, setGuardsList] = useState([]);
    useEffect(() => {
        // Appel API pour récupérer les gardes
      httpClient.get('/guardianships/user/{ownerUserId}?ownerUserId=1')
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
                                    const guardian = guard.id ? usersData.find(guardian => guardian.id === guard.guardianId) : null
                                    const owner  = usersData.find(owner => owner.id === guard.ownerId);
                                    return {...guard, plant: plant, guardian: guardian, owner: owner};
                                });
                                setGuardsList(updatedGuards);
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

    const renderGuard =({item: guard}) =>(
        <View>
          <Card key={guard.id} style={Style.card}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Guard', {guardId: guard.id})}
              title='MyGardsPage'>

              <Text title={guard.title}
                    style={Style.title}
                    onPress={() => navigation.navigate('guard', {guardId: guard.id})}>
                {guard.title}</Text>
              <Text style={Style.bulletPoint}>Plante associée : {guard.plant.name} </Text>
              <Text style={Style.bulletPoint}>Du <FormatDate date={guard.startDate}/> au
                <FormatDate date={guard.endDate}/></Text>
              {guard.guardian ? (
                  <Text style={Style.bulletPoint}>Gardé par : { guard.guardian.username } </Text>) :
                (<Text style={Style.bulletPoint}>Gardien à trouver !!! </Text>
                )}
            </TouchableOpacity>
          </Card>
        </View>
        );

    return (
        <View style={Style.container}>
          <FlatList data={guardsList}
                    renderItem={renderGuard}
                    keyExtractor={item => item.id.toString()}
                    numColumns={1}
                    contentContainerStyle={Style.container}
          />
        </View>
    );
}
export default MyGuardsPage