import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import MyDatePicker from './MyDatePicker';
import {Style} from "../Style";
import {Card, TextInput, Button} from 'react-native-paper';
import PlantChoice from "./PlantChoice";
import {PostGuardianships} from "../../api/GuardianshipsAPI/GuardiashipsAPI";

const GuardForm = (navigation) => {

  const[startDate] = useState(new Date())
  const[endDate, setEndDate] = useState(dateAddYears(2, new Date()))

  const [formData, setFormData] = useState({
    ownerId: 1,
    guardianId: 1,
    title: '',
    plantId: '',
    description: '',
    startDate: '',
    endDate: '',
    statusId: 1,
    navigation: navigation,
  });

  const handleInputChange = (inputName, inputValue) => {
    const newFormData = { ...formData, [inputName]: inputValue };
    setFormData(newFormData);
  };
  const changeStartDate = (date) => {
    handleInputChange('startDate', date)
  }
  const changeEndDate = (date) => {
    handleInputChange('endDate', date)
    setEndDate(date)
  }
  const selectPlant = (plant) =>{
    handleInputChange('plantId', plant.id)
  }

  const popup = () => {
    alert('Toutes les champs doivent être renseignés')
  };

  function dateAddYears(a, b) {
    let d = new Date(b || new Date()),
      c = d.getMonth();
    d.setFullYear(d.getFullYear() + a);
    if (d.getMonth() !== c) {
      d = new Date(d.setDate(d.getDate() - 1));
    }
    return d;
  }

  return (
    <ScrollView style={Style.container}
                keyboardShouldPersistTaps="handled">
      <Card>
        <TextInput label={"Nom de la garde : "}
                   value={formData.title}
                   onChangeText={(text) => handleInputChange('title', text)}
                   style={Style.input}
        />

        <PlantChoice onValueChange={selectPlant}/>

        <TextInput label={"Description de la garde :"}
                   value={formData.description}
                   onChangeText={(text) => handleInputChange('description', text)}
                   style={Style.input}
        />

        <View style={Style.containerHorizontal}>
          <MyDatePicker label='Date de début de garde' max={endDate } min={new Date()} onValueChange={changeStartDate}/>
          <MyDatePicker label='Date de fin de garde' min= {startDate} max={endDate} onValueChange={changeEndDate}/>
        </View>
        { (formData.title !== '' && formData.endDate !== '' && formData.startDate !== ''
          && formData.description !== '' && formData.plantId !== '') ?
            <PostGuardianships title="Ajouter" form={formData} style={Style.button}/> :
          <Button title='Ajouter' onPress={popup} style={Style.button}>Ajouter</Button>
        }
      </Card>

    </ScrollView>
  )
};

export default GuardForm