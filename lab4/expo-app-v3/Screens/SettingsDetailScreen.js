import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsDetailScreen() {
  const route = useRoute();
  const { categoryId, itemId, itemTitle } = route.params || {};

  // Sample settings configurations based on itemId
  const getSettingDetails = () => {
    const details = {
      privacy: {
        title: 'Privacy Settings',
        description: 'Control who can see your content and interact with you',
        options: [
          { label: 'Private Account', value: false },
          { label: 'Show Activity Status', value: true },
          { label: 'Allow Comments', value: true },
        ],
      },
      security: {
        title: 'Security Settings',
        description: 'Manage your account security and login options',
        options: [
          { label: 'Login Alerts', value: true },
          { label: 'Two-Factor Authentication', value: false },
          { label: 'Saved Login Info', value: true },
        ],
      },
      push: {
        title: 'Push Notifications',
        description: 'Choose what notifications you receive',
        options: [
          { label: 'Likes', value: true },
          { label: 'Comments', value: true },
          { label: 'Mentions', value: false },
          { label: 'Follows', value: true },
        ],
      },
      language: {
        title: 'Language Settings',
        description: 'Select your preferred language',
        options: [
          { label: 'English', value: true },
          { label: 'Spanish', value: false },
          { label: 'French', value: false },
        ],
      },
      theme: {
        title: 'Theme Settings',
        description: 'Customize the appearance of the app',
        options: [
          { label: 'Light Mode', value: true },
          { label: 'Dark Mode', value: false },
          { label: 'Auto (System)', value: false },
        ],
      },
    };

    return details[itemId] || {
      title: itemTitle || 'Settings',
      description: 'Configure your preferences',
      options: [
        { label: 'Option 1', value: true },
        { label: 'Option 2', value: false },
      ],
    };
  };

  const settingDetails = getSettingDetails();

  const renderOption = (option, index) => (
    <View key={index} style={styles.optionContainer}>
      <View style={styles.optionContent}>
        <Text style={styles.optionLabel}>{option.label}</Text>
      </View>
      <Switch
        value={option.value}
        onValueChange={(value) => {
          // Handle toggle change
          console.log(`${option.label}: ${value}`);
        }}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={option.value ? '#007AFF' : '#f4f3f4'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="settings-outline" size={48} color="#007AFF" style={styles.headerIcon} />
          <Text style={styles.title}>{settingDetails.title}</Text>
          <Text style={styles.description}>{settingDetails.description}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {settingDetails.options.map((option, index) => renderOption(option, index))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerIcon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  optionsContainer: {
    padding: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 12,
  },
  optionContent: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});