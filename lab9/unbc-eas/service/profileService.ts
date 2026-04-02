/**
 * Profile Service
 * 
 * This file provides business logic for managing user profiles.
 * It uses the profileStorage to interact with AsyncStorage.
 */

import { Profile } from '../types';
import { profileStorage } from '../storage/profileStorage';

export const profileService = {
  /**
   * Gets the current user profile
   * @returns The profile if found, null otherwise
   */
  async getProfile(): Promise<Profile | null> {
    return await profileStorage.getProfile();
  },

  /**
   * Saves or updates the user profile
   * @param profile - The profile object to save
   * @returns true if successful, false otherwise
   */
  async saveProfile(profile: Profile): Promise<boolean> {
    try {
      return await profileStorage.saveProfile(profile);
    } catch (e) {
      console.error('Error saving profile:', e);
      return false;
    }
  },

  /**
   * Creates or updates a profile with individual fields
   * @param name - The user's name
   * @param email - The user's full email address
   * @param profession - The user's profession
   * @returns true if successful, false otherwise
   */
  async saveProfileFields(name: string, email: string, profession: string): Promise<boolean> {
    try {
      const profile: Profile = {
        name: name.trim(),
        email: email.trim(),
        profession: profession.trim(),
      };
      
      return await profileStorage.saveProfile(profile);
    } catch (e) {
      console.error('Error saving profile fields:', e);
      return false;
    }
  },

  /**
   * Clears the user profile from storage
   * @returns true if successful, false otherwise
   */
  async clearProfile(): Promise<boolean> {
    try {
      return await profileStorage.clearProfile();
    } catch (e) {
      console.error('Error clearing profile:', e);
      return false;
    }
  },
};
