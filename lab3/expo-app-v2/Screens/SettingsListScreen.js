import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function SettingsListScreen() {
  const navigation = useNavigation();

  // Settings menu items with nested options
  const settingsMenu = [
    {
      id: 'account',
      title: 'Account',
      icon: 'person-outline',
      items: [
        { id: 'privacy', title: 'Privacy', icon: 'lock-closed-outline' },
        { id: 'security', title: 'Security', icon: 'shield-outline' },
        { id: 'two-factor', title: 'Two-Factor Authentication', icon: 'key-outline' },
        { id: 'blocked', title: 'Blocked Accounts', icon: 'ban-outline' },
      ],
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'notifications-outline',
      items: [
        { id: 'push', title: 'Push Notifications', icon: 'phone-portrait-outline' },
        { id: 'email', title: 'Email Notifications', icon: 'mail-outline' },
        { id: 'sms', title: 'SMS Notifications', icon: 'chatbubble-outline' },
        { id: 'story', title: 'Story Notifications', icon: 'images-outline' },
      ],
    },
    {
      id: 'content',
      title: 'Content & Media',
      icon: 'images-outline',
      items: [
        { id: 'auto-play', title: 'Auto-play Videos', icon: 'play-outline' },
        { id: 'download', title: 'Download Settings', icon: 'download-outline' },
        { id: 'quality', title: 'Media Quality', icon: 'tv-outline' },
        { id: 'saved', title: 'Saved Posts', icon: 'bookmark-outline' },
      ],
    },
    {
      id: 'general',
      title: 'General',
      icon: 'settings-outline',
      items: [
        { id: 'language', title: 'Language', icon: 'language-outline' },
        { id: 'theme', title: 'Theme', icon: 'color-palette-outline' },
        { id: 'storage', title: 'Storage', icon: 'folder-outline' },
        { id: 'cache', title: 'Clear Cache', icon: 'trash-outline' },
      ],
    },
    {
      id: 'support',
      title: 'Support',
      icon: 'help-circle-outline',
      items: [
        { id: 'help', title: 'Help Center', icon: 'book-outline' },
        { id: 'contact', title: 'Contact Us', icon: 'mail-outline' },
        { id: 'report', title: 'Report a Problem', icon: 'flag-outline' },
        { id: 'about', title: 'About', icon: 'information-circle-outline' },
      ],
    },
  ];

  const handleMenuItemPress = (categoryId, itemId, itemTitle) => {
    // Navigate to detail screen with stack animation
    navigation.navigate('SettingDetail', { 
      categoryId, 
      itemId, 
      itemTitle 
    });
  };

  const renderMenuItem = (item, categoryId) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => handleMenuItemPress(categoryId, item.id, item.title)}
      activeOpacity={0.7}
    >
      <View style={styles.menuItemContent}>
        <Ionicons name={item.icon} size={22} color="#666" style={styles.menuItemIcon} />
        <Text style={styles.menuItemText}>{item.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  const renderCategory = (category) => (
    <View key={category.id} style={styles.categoryContainer}>
      <View style={styles.categoryHeader}>
        <Ionicons name={category.icon} size={24} color="#333" style={styles.categoryIcon} />
        <Text style={styles.categoryTitle}>{category.title}</Text>
      </View>
      <View style={styles.menuItemsContainer}>
        {category.items.map((item) => renderMenuItem(item, category.id))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {settingsMenu.map((category) => renderCategory(category))}
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
  categoryContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  categoryIcon: {
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  menuItemsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
});