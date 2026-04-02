import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface HeaderProps {
  title?: string;
  showSettings?: boolean;
  showBack?: boolean; // Show back button when true
}

export default function Header({ title = 'UNBC Notes', showSettings = true, showBack = false }: HeaderProps) {
  const navigation = useNavigation<NavigationProp>();
  const canGoBack = navigation.canGoBack();

  return (
    <View style={styles.header}>
      {/* Left Section - Back Button */}
      <View style={styles.leftSection}>
        {(showBack && canGoBack) && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#035642" />
          </TouchableOpacity>
        )}
      </View>

      {/* Center Section - Logo and Title */}
      <View style={styles.centerSection}>
        <Image source={require('../assets/UNBC.jpg')} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Right Section - Settings Button */}
      <View style={styles.rightSection}>
        {showSettings && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsButton}
          >
            <Ionicons name="settings-outline" size={24} color="#035642" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  leftSection: {
    width: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSection: {
    width: 50,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  backButton: {
    padding: 5,
  },
  settingsButton: {
    padding: 5,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#035642',
  },
});
