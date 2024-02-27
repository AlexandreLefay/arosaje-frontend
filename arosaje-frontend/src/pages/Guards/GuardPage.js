import React, { useEffect, useState} from 'react';
import {Card} from "react-native-paper";
import { ScrollView, Text} from "react-native";
import FormatDate from "../../components/guards/FormatDate";
import {Style} from "../../components/Style";
import {getGuardById} from "../../api/GuardianshipsAPI/GuardiashipsAPI";
import {getPlantById} from "../../api/plantAPI/PlantAPI";
import {getUserById} from "../../api/UserAPI/UserApi";

const GuardPage = (props) =>{
    const [guard, setGuard] = useState([]);
    const [guardian, setGuardian] = useState([]);
    const [owner, setOwner] = useState([]);
    const [plant, setPlant] = useState([]);

    useEffect(()=>{
        let guardId = props.route.params.guardId ? props.route.params.guardId :1
        let guardData = null
        getGuardById({guardId: guardId}).then(guardResponse =>{
            setGuard(guardResponse.data)
            guardData = guardResponse.data
            if(guardData.guardianId){
                getUserById({userId: guardData.guardianId}).then(response =>{
                    setGuardian(response.data)})
            }
            getUserById({userId: guardData.ownerId}).then(response =>{
                setOwner(response.data)})

            getPlantById({plantId: guardData.plantId}).then(plantResponse => {
                setPlant(plantResponse.data)})
            })
    }, []);

    return(
        <ScrollView style={Style.container}>
            <Card key={guard.id} style={Style.card} >
                <Text style={Style.title}>{guard.title}</Text>
                <Text style={Style.bulletPoint}>Garde n° : {guard.id}</Text>
                <Text style={Style.bulletPoint}>Propriétaire : {owner.username}</Text>
                <Card style={Style.plantCard}>
                    {/*<Image source={{uri: plant.imageBlob || undefined}} style={Style.plantImage}/>*/}
                    <Card.Content>
                        <Text style={Style.plantName}>{plant.name} ({plant.species})</Text>
                        <Text style={Style.plantCare}>{plant.careInstructions}</Text>
                    </Card.Content>
                </Card>
                <Text style={Style.bulletPoint}>Date de début de la garde : <FormatDate date={guard.startDate}/></Text>
                <Text style={Style.bulletPoint}>Date de fin de la garde : <FormatDate date={guard.endDate}/></Text>
                {guard.guardianId ? (
                  <Text style={Style.bulletPoint}>Gardien : {guardian.username}</Text>) : (
                  <Text style={Style.bulletPoint}>pas de gardien</Text>) }
                    </Card>
        </ScrollView>
    )
}
export default GuardPage