import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Camera} from 'expo-camera';
import {MaterialIcons} from '@expo/vector-icons';
import {httpClient} from "../../utils/httpClient";

const TakePhotoScreen = ({navigation, route}) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [camera, setCameraRef] = useState(null);

    useEffect(() => {
        (async () => {
            const {status} = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (camera) {
            let photo = await camera.takePictureAsync();
            let localUri = photo.uri;
            let filename = localUri.split('/').pop();

            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;

            let formData = new FormData();
            formData.append('file', {uri: localUri, name: filename, type});
            formData.append('userId', route.params.userId);
            formData.append('plantId', route.params.plantId);

            try {
                await httpClient.post('/photos/upload', formData, {
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                navigation.goBack();
            } catch (error) {
                Alert.alert("Error", "Failed to upload photo.");
            }
        }
    };

    if (hasPermission === null) {
        return <View/>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={setCameraRef}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.captureButton}
                        onPress={takePicture}>
                        <MaterialIcons name="camera" size={36} color="#FFF"/>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 36,
    },
    captureButton: {
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 50,
        padding: 15,
    },
});

export default TakePhotoScreen;
