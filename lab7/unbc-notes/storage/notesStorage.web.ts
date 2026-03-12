/**
 * Notes Storage for Web platform
 * Uses AsyncStorage only - never touches SQLite/Drizzle
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types';

const NOTES_KEY = '@unbc_notes_list';

export const notesStorage = {
  async getAllNotes(): Promise<Note[]> {
    try {
      const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
      const notes = jsonValue != null ? JSON.parse(jsonValue) : [];
      notes.sort((a: Note, b: Note) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      return notes;
    } catch (e) {
      console.error('Error reading notes from AsyncStorage:', e);
      return [];
    }
  },

  async getNoteById(id: string): Promise<Note | null> {
    try {
      const notes = await this.getAllNotes();
      return notes.find((note: Note) => note.id === id) || null;
    } catch (e) {
      console.error('Error reading note from AsyncStorage:', e);
      return null;
    }
  },

  async saveNote(note: Note): Promise<boolean> {
    try {
      const notes = await this.getAllNotes();
      notes.push(note);
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      return true;
    } catch (e) {
      console.error('Error saving note to AsyncStorage:', e);
      return false;
    }
  },

  async updateNote(note: Note): Promise<boolean> {
    try {
      const notes = await this.getAllNotes();
      const index = notes.findIndex((n: Note) => n.id === note.id);
      if (index === -1) return false;
      notes[index] = note;
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(notes));
      return true;
    } catch (e) {
      console.error('Error updating note in AsyncStorage:', e);
      return false;
    }
  },

  async deleteNote(id: string): Promise<boolean> {
    try {
      const notes = await this.getAllNotes();
      const filteredNotes = notes.filter((note: Note) => note.id !== id);
      if (filteredNotes.length === notes.length) return false;
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filteredNotes));
      return true;
    } catch (e) {
      console.error('Error deleting note from AsyncStorage:', e);
      return false;
    }
  },

  async clearNotes(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(NOTES_KEY);
      return true;
    } catch (e) {
      console.error('Error clearing notes from AsyncStorage:', e);
      return false;
    }
  },
};
