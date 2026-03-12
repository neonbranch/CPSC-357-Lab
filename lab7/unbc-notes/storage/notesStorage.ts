import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types';

const NOTES_KEY = '@unbc_notes_list';

export const notesStorage = {
  async getAllNotes(): Promise<Note[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
      console.error('Error reading notes:', e);
      return [];
    }
  },

  async saveNotes(notes: Note[]): Promise<boolean> {
    try {
      const jsonValue = JSON.stringify(notes);
      await AsyncStorage.setItem(NOTES_KEY, jsonValue);
      return true;
    } catch (e) {
      console.error('Error saving notes:', e);
      return false;
    }
  },

  async clearNotes(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(NOTES_KEY);
      return true;
    } catch (e) {
      console.error('Error clearing notes:', e);
      return false;
    }
  },
};
