import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Profile } from '../types';
import Header from '../components/Header';
import { profileStorage } from '../storage/profileStorage';
// Import utility functions from utils folder
import {
  PROFESSION_OPTIONS,
  createFullEmail,
  validateProfileFields,
} from '../utils/profileUtils';
import { showAlert } from '../utils/alertUtils';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function SettingsScreen() {
  // Navigation hook - allows us to move between screens
  const navigation = useNavigation<NavigationProp>();

  // State variables - these store the current values of our form fields
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState('');
  const [emailPrefix, setEmailPrefix] = useState('');
  const [profession, setProfession] = useState('');
  const [loading, setLoading] = useState(false);

  // State for showing/hiding the profession picker modal
  const [showProfessionPicker, setShowProfessionPicker] = useState(false);

  // Load profile when screen opens
  useEffect(() => {
    loadProfile();
  }, []);

  /**
   * Helper function to extract username from email (remove @unbc.ca)
   * This is used when loading an existing profile
   */
  const extractEmailPrefix = (email: string): string => {
    if (email.endsWith('@unbc.ca')) {
      return email.replace('@unbc.ca', '');
    }
    return email;
  };

  /**
   * Loads the user's profile from storage and fills in the form fields
   */
  const loadProfile = async () => {
    const loadedProfile = await profileStorage.getProfile();
    if (loadedProfile) {
      setProfile(loadedProfile);
      setName(loadedProfile.name);
      
      // Extract username part from email (remove @unbc.ca)
      const emailUsername = extractEmailPrefix(loadedProfile.email);
      setEmailPrefix(emailUsername);
      
      setProfession(loadedProfile.profession);
    }
  };

  /**
   * This function is called when the user clicks the "Save Changes" button
   * It validates the form and saves the profile data
   */
  /**
   * This function is called when the user clicks the "Save Changes" button
   * It validates the form and saves the profile data
   */
  const handleSave = async () => {
    // Use the validateProfileFields function from utils to check if all fields are filled
    if (!validateProfileFields(name, emailPrefix, profession)) {
      showAlert('Error', 'Please fill in all fields');
      return;
    }

    // Use the createFullEmail function from utils to combine username with @unbc.ca
    const fullEmail = createFullEmail(emailPrefix);

    // Show loading state (button will be disabled)
    setLoading(true);

    // Try to save the profile
    const success = await profileStorage.saveProfile({
      name: name.trim(),
      email: fullEmail,
      dateOfBirth: '', // Empty string since date of birth is removed
      profession: profession.trim(),
    });

    // Hide loading state
    setLoading(false);

    // If save was successful, show success message and reload profile
    if (success) {
      showAlert('Success', 'Profile updated successfully');
      await loadProfile();
    } else {
      // If save failed, show an error message
      showAlert('Error', 'Failed to update profile. Please try again.');
    }
  };

  const handleReset = () => {
    showAlert(
      'Reset Profile',
      'Are you sure you want to reset your profile? This will clear all your data and return you to the onboarding screen.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            const success = await profileStorage.clearProfile();
            if (success) {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Profile' }],
              });
            } else {
              showAlert('Error', 'Failed to reset profile. Please try again.');
            }
          },
        },
      ]
    );
  };

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.centerContent}>
          <Text>Loading profile...</Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            {/* Email Input Field - Only username part, @unbc.ca is fixed */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.emailContainer}>
                <TextInput
                  style={styles.emailInput}
                  placeholder="username"
                  value={emailPrefix}
                  onChangeText={setEmailPrefix}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                {/* This part is always @unbc.ca and cannot be changed */}
                <Text style={styles.emailSuffix}>@unbc.ca</Text>
              </View>
            </View>

            {/* Profession Picker - Opens a modal to select profession */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Profession</Text>
              <TouchableOpacity
                style={styles.pickerButton}
                onPress={() => setShowProfessionPicker(true)}
              >
                {/* Show currently selected profession */}
                <Text style={styles.pickerText}>{profession}</Text>
                <Ionicons name="chevron-down-outline" size={20} color="#035642" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reset Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Profession Picker Modal - Popup window for selecting profession */}
      <Modal
        visible={showProfessionPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowProfessionPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Profession</Text>
            
            {/* Display each profession option from PROFESSION_OPTIONS */}
            {PROFESSION_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.professionOption,
                  // Highlight the selected profession
                  profession === option && styles.professionOptionSelected,
                ]}
                onPress={() => {
                  // Save the selected profession and close the modal
                  setProfession(option);
                  setShowProfessionPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.professionOptionText,
                    // Make selected profession text bold and green
                    profession === option && styles.professionOptionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {/* Show checkmark next to selected profession */}
                {profession === option && (
                  <Ionicons name="checkmark" size={20} color="#035642" />
                )}
              </TouchableOpacity>
            ))}
            
            {/* Cancel Button - Closes modal without changing selection */}
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonCancel, { marginTop: 10 }]}
              onPress={() => setShowProfessionPicker(false)}
            >
              <Text style={styles.modalButtonTextCancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#035642',
    marginBottom: 16,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  emailInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  emailSuffix: {
    padding: 12,
    fontSize: 16,
    color: '#035642',
    fontWeight: '600',
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#999',
  },
  button: {
    backgroundColor: '#035642',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  resetButtonText: {
    color: '#d32f2f',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#035642',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonCancel: {
    backgroundColor: '#f0f0f0',
  },
  modalButtonConfirm: {
    backgroundColor: '#035642',
  },
  modalButtonTextCancel: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonTextConfirm: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  professionOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  professionOptionSelected: {
    backgroundColor: '#e8f5e9',
    borderColor: '#035642',
  },
  professionOptionText: {
    fontSize: 16,
    color: '#333',
  },
  professionOptionTextSelected: {
    color: '#035642',
    fontWeight: '600',
  },
});
