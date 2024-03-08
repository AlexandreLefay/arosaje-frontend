import React, { useState} from 'react';
import { ScrollView, View} from 'react-native';
import {Button,Avatar, Card, Text, TextInput, Title} from 'react-native-paper';
import logo from'../../../assets/logo.png'
import {Style} from "../../components/Style"
import {checkThisUsername, checkThisEmail, addUser, login} from "../../api/UserAPI/UserApi";
import {coordinateAPI} from "../../api/UserAPI/AdressAPI";
import TermsAndConditionsPopup from "../../components/users/TermsAndConditionsPopup";
import {useNavigation} from "@react-navigation/native";

function SignUpScreen() {
    const navigation = useNavigation();
    const [userFormData, setUserFormData] = useState({
        username: '',
        firstname:'',
        lastname:'',
        email:'',
        phone:'',
        address:{
            street:'',
            zip:'',
            city:''
        },
        x:'',
        y:'',
        password:'',
    });
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [streetError, setStreetError] = useState('');
    const [zipError, setZipError] = useState('');
    const [cityError, setCityError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [address, setAddress] = useState({ street:'', zip:'', city:'' });
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [termsError, setTermsError] = useState('');
    const handleAcceptTerms = () => {
        setTermsError('');
        setAcceptTerms(true);
        setShowPopup(false);
    };

    const handleCloseTerms = () => {
        setAcceptTerms(true);
        setTermsError("Vous devez accepter les conditions générales d'utilisation afin de pouvoir utiliser cette application")
        setShowPopup(false);
    };
    const handleInputChange = (inputName, inputValue) => {
        setUserFormData({ ...userFormData, [inputName]: inputValue });
    };
    const handleAddressChange =(addressParam, value) =>{
        setAddress({ ...address, [addressParam]: value });
    };


    function checkUsername() {
        setUsernameError('');
        if (userFormData.username === '') {
            setUsernameError("Un nom d'utilisateur est nécessaire à l'incription.")
        } else {
            checkThisUsername({username: userFormData.username}).then(response => {
                if (response !== "Ce nom d'utilisateur est disponible") {
                    setUsernameError(response);
                }
            })
        }
    }

    function checkEmail() {
        setEmailError('');
        if (userFormData.email === '') {
            setEmailError("Un email est nécessaire à l'incription.")
        } else {
            checkThisEmail({email: userFormData.email}).then(response => {
                if (response !== "Cet email est disponible") {
                    setEmailError(response);
                }
            })
        }
    }

    function checkPassword() {
        if (password !== null && confirmPassword !== null && password === confirmPassword) {
            setPasswordError('');
            handleInputChange('password', password);
        } else {
            setPasswordError('Les mots passe saisis ne correspondent pas');
        }
    }

    function getCoordinate() {
        setAddressError('')
        if (address.zip !== '' && address.city !== '' && address.street !== '') {
            coordinateAPI({street: address.street, city: address.city})
              .then(response => {
                  if (response.coordinateError !== '') {
                      setAddressError("Il y a un problème dans la saisie de l'adresse")
                  }
                  setUserFormData({ ...userFormData, ['address']: address, ['x']: response.x, ['y']: response.y});
              })
        }
    }

    function checkAndSend() {
        let isOk = true;
        checkUsername()
        if (usernameError !== '') {
            isOk = false;
        }
        checkEmail()
        if (emailError !== '') {
            isOk = false;
        }
        if (userFormData.firstname === '') {
            isOk = false;
            setFirstNameError("Le nom de l'utilisateur est nécessaire à l'inscription.")
        }else{setFirstNameError('')}
        if (userFormData.lastname === '') {
            isOk = false;
            setLastNameError("le prénom de l'utilisateur est nécessaire à l'inscription.")
        }else{setLastNameError('')}
        const phoneRegex = /^\d{10}$/;
        if (userFormData.phone === '' || !phoneRegex.test(userFormData.phone)) {
            isOk = false;
            setPhoneError("Un numéro de téléphone valide est nécessaire à l'inscription.")
        }else{setPhoneError('')}
        if (userFormData.address.street === '') {
            isOk = false;
            setStreetError("Une rue est nécessaire à l'adresse.")
        }
        const zipRegex = /^\d{5}$/;
        if (userFormData.address.zip === '' || !zipRegex.test(userFormData.address.zip)) {
            isOk = false;
            setZipError("Un code postal valide est nécessaire à l'adresse.")
        }
        if (userFormData.address.city === '') {
            isOk = false;
            setCityError("Une ville est nécessaire à l'adresse.")
        }
        if (userFormData.x === '' || userFormData.y === '') {
            isOk = false;
            setAddressError("Une adresse valide est nécessaire pour poursuivre l'inscription.")
        }
        if (userFormData.password === '') {
            isOk = false;
            setPasswordError("Veuillez saisir un mot de passe...")
        }
        if (!acceptTerms){
            isOk = false;
            setTermsError("Vous devez accepter les conditions générales d'utilisation afin de pouvoir utiliser cette application");
        }
        if(isOk){
            addUser({form: userFormData});
            login({username: userFormData.username, password: usernameError.password, navigation: navigation});
            navigation.navigate("Login");
        }

    }

    return (
        <ScrollView style={Style.container} keyboardShouldPersistTaps="handled">
            <View style={Style.profileHeader}>
                <Avatar.Image
                    size={140}
                    source={logo}
                    style={Style.avatar}
                />
                <Title style={Style.name}>Inscription</Title>
            </View>
            <Card style={Style.card}>
                <Card.Content>
                    <TextInput style={Style.input}
                               label={"Nom d'utilisateur : "}
                               value={userFormData.username}
                               onChangeText={(text) => handleInputChange('username', text)}
                               onBlur={checkUsername}/>
                    {usernameError ? <Text style={Style.error}>{usernameError}</Text> : null}
                    <TextInput style={Style.input}
                               label={"Email de l'utilisateur : "}
                               value={userFormData.email}
                               onChangeText={(text) => handleInputChange('email', text)}
                               onBlur={checkEmail}/>
                    {emailError ? <Text style={Style.error}>{emailError}</Text> : null}
                    <TextInput style={Style.input}
                               label={"Prénom : "}
                               value={userFormData.firstname}
                               onChangeText={(text) => handleInputChange('firstname', text)}/>
                    {firstNameError ? <Text style={Style.error}>{firstNameError}</Text> : null}
                    <TextInput style={Style.input}
                               label={"Nom : "}
                               value={userFormData.lastname}
                               onChangeText={(text) => handleInputChange('lastname', text)}/>
                    {lastNameError ? <Text style={Style.error}>{lastNameError}</Text> : null}
                    <TextInput style={Style.input}
                               label={"Numéro de téléphone : "}
                               value={userFormData.phone}
                               onChangeText={(text) => handleInputChange('phone', text)}/>
                    {phoneError ? <Text style={Style.error}>{phoneError}</Text> : null}
                    <Card>
                        <TextInput style={Style.input}
                                   label={"Rue : "}
                                   value={address.street}
                                   onChangeText={(text) => handleAddressChange('street', text)}
                                   onBlur={getCoordinate}/>
                        {streetError ? <Text style={Style.error}>{streetError}</Text> : null}
                        <TextInput style={Style.input}
                                   label={"Code postal : "}
                                   value={address.zip}
                                   onChangeText={(text) => handleAddressChange('zip', text)}
                                   onBlur={getCoordinate}/>
                        {zipError ? <Text style={Style.error}>{zipError}</Text> : null}
                        <TextInput style={Style.input}
                                   label={"Ville : "}
                                   value={address.city}
                                   onChangeText={(text) => handleAddressChange('city', text)}
                                   onBlur={getCoordinate}/>
                        {cityError ? <Text style={Style.error}>{cityError}</Text> : null}
                    </Card>
                    {addressError ? <Text style={Style.error}>{addressError}</Text> : null}
                    <TextInput style={Style.input}
                               secureTextEntry={true}
                               label={"Mot de passe : "}
                               value={password}
                               onChangeText={(text) => setPassword(text)}
                               onBlur={checkPassword}/>
                    <TextInput style={Style.input}
                               secureTextEntry={true}
                               label={"Confirmation du mot de passe : "}
                               value={confirmPassword}
                               onChangeText={(text) => setConfirmPassword(text)}
                               onBlur={checkPassword}/>
                    {passwordError ? <Text style={Style.error}>{passwordError}</Text> : null}

                    <Button style={Style.button}
                            title="Afficher les conditions générales d'utilisation"
                            onPress={() => setShowPopup(true)}>Afficher les conditions générales d'utilisation</Button>
                    <TermsAndConditionsPopup visible={showPopup} onClose={handleCloseTerms} onAccept={handleAcceptTerms} />
                    {termsError ? <Text style={Style.error}>{termsError}</Text> : null}
                    <Button style={Style.button}
                            title="Inscription"
                            onPress={checkAndSend}>
                        Inscription</Button>
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

export default SignUpScreen;
