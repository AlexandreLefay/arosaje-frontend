import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screen/Login/LoginScreen';
import BottomNavigator from '../components/navigation/BottomNavigator';
import MyGuardsPage from "../pages/Guards/MyGuardsPage";
import AddGuardPage from "../pages/Guards/AddGuardPage";
import AllGuardsPage from "../pages/Guards/AllGuardsPage";
import GuardingPage from "../pages/Guards/GuardingPage";
import GuardPage from "../pages/Guards/GuardPage";
import AddPlantScreen from "../screen/Plant/AddPlantScreen";
import TakePhotoScreen from "../screen/Plant/TakePhotoScreen";
import AddTicketScreen from "../screen/Ticket/AddTicketScreen";
import SignUpScreen from "../screen/SignUp/SignUpScreen";

const Stack = createNativeStackNavigator();

function AppNavigator() {
    const [ headerTitle, setHeaderTitle] = React.useState("Home");

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="Home" component={BottomNavigator}
                              options={({route}) => ({
                                  title: route.params?.title || 'Titre par Défaut',
                              })}/>
                <Stack.Screen name="MyGuards" component={MyGuardsPage}
                              options={{title: 'Mes gardes'}}/>
                <Stack.Screen
                    name="AllGuards" component={AllGuardsPage}
                    options={{title: 'Proposer de garder des plantes'}}/>
                <Stack.Screen
                    name="Guarding" component={GuardingPage}
                    options={{title: 'Mes gardes en cours'}}/>
                <Stack.Screen
                    name="AddGuard" component={AddGuardPage}
                    options={{title: 'Ajouter une garde'}}/>
                <Stack.Screen
                    name="Guard" component={GuardPage}
                    options={{title: 'Gard'}}/>
                <Stack.Screen
                    name="AddPlant" component={AddPlantScreen}
                    options={{title: 'Plant'}}/>
                <Stack.Screen
                    name="TakePhoto" component={TakePhotoScreen}
                    options={{title: 'Photo'}}/>
                <Stack.Screen
                    name="AddTicket" component={AddTicketScreen}
                    options={{title: 'Ticket'}}/>
                <Stack.Screen name="Profil" component={BottomNavigator}/>
                <Stack.Screen name="Ticket" component={BottomNavigator}/>
                <Stack.Screen name="Plant" component={BottomNavigator}/>
                <Stack.Screen name="Garde" component={BottomNavigator}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;
