import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Camera({ onPhotoTaken }) {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={styles.container}>
                <Text style={styles.message}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="grant permission" />
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    async function takePicture() {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                if (onPhotoTaken) {
                    onPhotoTaken(photo.uri);
                } else {
                    alert('Success', 'Picture taken successfully!', [
                        { text: 'OK' }
                    ]);
                    console.log('Photo URI:', photo.uri);
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to take picture');
                console.error('Error taking picture:', error);
            }
        }
    }

    return (
        <View style={styles.container}>
            <CameraView
                facing={facing}
                ref={cameraRef}
                style={styles.camera}
                // zoom={4.0}
                // flash='on'
                // enableTorch={true}
                // active={true}
                // ratio='1:1'
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                    <Ionicons name="swap-horizontal-outline" size={28} color="white" />
                    <Text style={styles.text}>Flip Camera</Text>
                </TouchableOpacity>
                <View style={styles.captureContainer}>
                    <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
                        <View style={styles.captureButtonInner} />
                    </TouchableOpacity>
                    <Text style={styles.captureText}>Take Picture</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 64,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        paddingHorizontal: 64,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    text: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
        marginTop: 4,
    },
    captureContainer: {
        alignItems: 'center',
    },
    captureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        marginBottom: 8,
    },
    captureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    captureText: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 6,
    },
});
