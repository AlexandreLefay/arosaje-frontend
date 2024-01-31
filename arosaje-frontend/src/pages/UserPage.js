import React from 'react';
import { View, Text, Button } from 'react-native';
import Navbar from "../components/Navbar";
import PlantPreview from '../components/PlantPreview';


const UserPage = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Page de l'utilisateur</Text>
      <PlantPreview
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSodhDPJPgYk7jzA-UX8CV2s_PKEnRzd4Q03w&usqp=CAU"
        imageName="Cactus"
      />
    
      <Navbar navigation={navigation} />
    </View>
  );
};

export default UserPage;