import {httpClient} from "../../utils/httpClient";
import axios from "axios";
import {apiIp} from "../../utils/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Alert} from "react-native";

export const getUserById = async (props) => {
  return await httpClient.get('/users/'+props.userId);
}

export const checkThisEmail = async (props) => {
    let isFree = "Problème de connexion à la bas de données"
    try {
      const response = await httpClient.get('/users/email/'+props.email);
      if (response.status === 200) {
        isFree = "Cet email est déjà utilisé";
      }
    } catch (error){
      if (error.response && error.response.status === 404) {
        isFree = "Cet email est disponible";
      }
    }
    return isFree
  }
export const checkThisUsername= async (props) => {
  let isFree = "Problème de connexion à la bas de données"
  try {
    const response = await httpClient.get('/users/username/'+props.username)
    if (response.status === 200) {
      isFree =  "Ce nom d'utilisateur est déjà utilisé";
    }
  } catch (error){
    if (error.response && error.response.status === 404) {
      isFree = "Ce nom d'utilisateur est disponible";
    }
  }
  return isFree
}

export function addUser (props) {
  httpClient.post('/users',{
    "username": props.form.username,
    "firstname": props.form.firstname,
    'lastname': props.form.lastname,
    'email': props.form.email,
    'phone': props.form.phone,
    'address': props.form.address,
    'x': props.form.x,
    'y': props.form.y,
    'password': props.form.password,
    'roles':[{'name': 'User'}]
    }).then( response=> {
      alert("Vous êtes bien inscrit !")}).
      catch(error => {console.error('Erreur lors de la requête POST:', error)}
      )
}
export function login(props){
  const username = props.username
  const password = props.password
  const navigation = props.navigation
  axios.post(apiIp+'/login', {username, password})
    .then(response => {
      const currentUser = response.data
      currentUser['jwt']= response.headers['x-authorization']

      if (response.data.userId) {

        AsyncStorage.setItem('CURRENT_USER', JSON.stringify(currentUser)).then(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
        });
      } else {
        Alert.alert("Erreur", "Nom d'utilisateur ou mot de passe incorrect.");
      }
    })
    .catch(error => {
      console.error(error);
      Alert.alert("Erreur", "Nom d'utilisateur ou mot de passe incorrect.");
    });
}