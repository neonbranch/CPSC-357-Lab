import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import Header from '../components/Header';
import Camera from '../components/camera';
import CustomButton from '../components/CustomButton';

export default function PostScreen() {
    const [postText, setPostText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'We need permission to access your photos!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result.assets[0]);
        setPostText(result.assets[0].mimeType || 'Untitled');

        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    const handleCameraPhoto = (photoUri) => {
        setSelectedImage(photoUri);
        setShowCamera(false);
        setPostText(photoUri);
    };

    const handlePost = () => {
        if (!postText.trim() && !selectedImage) {
            Alert.alert('Error', 'Please add text or an image');
            return;
        }
        
        setIsUploading(true);
        setShowSuccess(false);
        
        setTimeout(() => {
            setIsUploading(false);
            setShowSuccess(true);
            setPostText('');
            setSelectedImage(null);
            
            setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        }, 2000);
    };

    if (showCamera) {
        return (
            <SafeAreaProvider>
                <SafeAreaView style={styles.container}>
                    <Header title="Camera" />
                    <View style={styles.content}>
                        <Camera onPhotoTaken={handleCameraPhoto} />
                    </View>
                    <CustomButton 
                        onPress={() => setShowCamera(false)} 
                        title="Back" 
                    />
                </SafeAreaView>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <Header title="Add Post" />
                {isUploading && (
                    <View style={styles.uploadingMessage}>
                        <ActivityIndicator size="small" color="#fff" />
                        <Text style={styles.uploadingText}>Uploading...</Text>
                    </View>
                )}
                {showSuccess && (
                    <View style={styles.successMessage}>
                        <Text style={styles.successIcon}>✓</Text>
                        <Text style={styles.successText}>Post created successfully!</Text>
                    </View>
                )}
                <ScrollView 
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.inputSection}>
                        <Text style={styles.sectionLabel}>What's on your mind?</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Share your thoughts..."
                            placeholderTextColor="#999"
                            multiline
                            value={postText}
                            onChangeText={setPostText}
                        />
                    </View>

                    {selectedImage && (
                        <View style={styles.imageContainer}>
                            <View style={styles.imageWrapper}>
                                <Image source={{ uri: selectedImage }} style={styles.image} />
                                <TouchableOpacity 
                                    style={styles.removeButton}
                                    onPress={() => setSelectedImage(null)}
                                >
                                    <Text style={styles.removeText}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    <View style={styles.optionsSection}>
                        <Text style={styles.sectionLabel}>Add Photo</Text>
                        <View style={styles.optionsContainer}>
                            <TouchableOpacity 
                                style={styles.optionButton}
                                onPress={() => setShowCamera(true)}
                            >
                                <Text style={styles.optionIcon}>📷</Text>
                                <Text style={styles.optionText}>Take Photo</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.optionButton}
                                onPress={pickImage}
                            >
                                <Text style={styles.optionIcon}>🖼️</Text>
                                <Text style={styles.optionText}>Upload</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <CustomButton 
                        onPress={handlePost} 
                        title="Post" 
                    />
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    content: {
        flex: 1,
    },
    inputSection: {
        marginBottom: 24,
    },
    sectionLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        minHeight: 120,
        textAlignVertical: 'top',
        backgroundColor: '#fff',
        color: '#333',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    imageContainer: {
        marginBottom: 24,
    },
    imageWrapper: {
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    removeButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    optionsSection: {
        marginBottom: 24,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    optionButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginHorizontal: 6,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    optionIcon: {
        fontSize: 32,
        marginBottom: 8,
    },
    optionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    uploadingMessage: {
        position: 'absolute',
        top: 80,
        left: 20,
        right: 20,
        backgroundColor: '#2196F3',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    uploadingText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        marginLeft: 10,
    },
    successMessage: {
        position: 'absolute',
        top: 80,
        left: 20,
        right: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 12,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    successIcon: {
        fontSize: 24,
        color: '#fff',
        marginRight: 10,
        fontWeight: 'bold',
    },
    successText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
});
