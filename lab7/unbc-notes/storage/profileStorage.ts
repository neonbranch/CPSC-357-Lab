import AsyncStorage from '@react-native-async-storage/async-storage';
import { Profile } from '../types';

const PROFILE_KEY = '@unbc_notes_profile';

export const profileStorage = {
  async getProfile(): Promise<Profile | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(PROFILE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Error reading profile:', e);
      return null;
    }
  },

  async saveProfile(profile: Profile): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(profile);
      await AsyncStorage.setItem(PROFILE_KEY, jsonValue);
      return true;
    } catch (e) {
      console.error('Error saving profile:', e);
      return false;
    }
  },

  async clearProfile(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(PROFILE_KEY);
      return true;
    } catch (e) {
      console.error('Error clearing profile:', e);
      return false;
    }
  },
};
