/**
 * Notes Storage using SQLite Database (Mobile) or AsyncStorage (Web)
 * 
 * This file handles all database operations for notes.
 * - Mobile (iOS/Android): Uses SQLite for better performance
 * - Web: Uses AsyncStorage as fallback since SQLite has compatibility issues on web
 */

import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note } from '../types';
import { DATABASE_NAME, NOTES_TABLE, CREATE_NOTES_TABLE_SQL } from '../db/dbconfig';

// Storage key for AsyncStorage (web fallback)
const NOTES_KEY = '@unbc_notes_list';

// Open or create the database (only for mobile)
let db: SQLite.SQLiteDatabase | null = null;

/**
 * Gets or creates the database connection (mobile only)
 * This function ensures the database is initialized and the table exists
 */
async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (Platform.OS === 'web') {
    throw new Error('SQLite is not available on web. Use AsyncStorage instead.');
  }

  if (db) {
    return db;
  }

  // Open the database
  db = await SQLite.openDatabaseAsync(DATABASE_NAME);

  // Create the notes table if it doesn't exist
  await db.execAsync(CREATE_NOTES_TABLE_SQL);

  return db;
}

export const notesStorage = {
  /**
   * Gets all notes from storage
   * @returns Array of all notes
   */
  async getAllNotes(): Promise<Note[]> {
    try {
      if (Platform.OS === 'web') {
        // Use AsyncStorage for web
        const jsonValue = await AsyncStorage.getItem(NOTES_KEY);
        const notes = jsonValue != null ? JSON.parse(jsonValue) : [];
        // Sort by updatedAt descending
        return notes.sort((a: Note, b: Note) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      } else {
        // Use SQLite for mobile
        const database = await getDatabase();
        const result = await database.getAllAsync<Note>(
          `SELECT * FROM ${NOTES_TABLE} ORDER BY updatedAt DESC`
        );
        return result || [];
      }
    } catch (e) {
      console.error('Error reading notes:', e);
      return [];
    }
  },

  /**
   * Gets a single note by its ID
   * @param id - The note ID to find
   * @returns The note if found, null otherwise
   */
  async getNoteById(id: string): Promise<Note | null> {
    try {
      if (Platform.OS === 'web') {
        // Use AsyncStorage for web
        const notes = await this.getAllNotes();
        return notes.find(note => note.id === id) || null;
      } else {
        // Use SQLite for mobile
        const database = await getDatabase();
        const result = await database.getFirstAsync<Note>(
          `SELECT * FROM ${NOTES_TABLE} WHERE id = ?`,
          [id]
        );
        return result || null;
      }
    } catch (e) {
      console.error('Error reading note:', e);
      return null;
    }
  },

  /**
   * Saves a new note to storage
   * @param note - The note object to save
   * @returns true if successful, false otherwise
   */
  async saveNote(note: Note): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        // Use AsyncStorage for web
        const notes = await this.getAllNotes();
        notes.push(note);
        const jsonValue = JSON.stringify(notes);
        await AsyncStorage.setItem(NOTES_KEY, jsonValue);
        return true;
      } else {
        // Use SQLite for mobile
        const database = await getDatabase();
        await database.runAsync(
          `INSERT INTO ${NOTES_TABLE} (id, title, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)`,
          [note.id, note.title, note.content, note.createdAt, note.updatedAt]
        );
        return true;
      }
    } catch (e) {
      console.error('Error saving note:', e);
      return false;
    }
  },

  /**
   * Updates an existing note in storage
   * @param note - The note object with updated data
   * @returns true if successful, false otherwise
   */
  async updateNote(note: Note): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        // Use AsyncStorage for web
        const notes = await this.getAllNotes();
        const index = notes.findIndex(n => n.id === note.id);
        if (index === -1) {
          return false;
        }
        notes[index] = note;
        const jsonValue = JSON.stringify(notes);
        await AsyncStorage.setItem(NOTES_KEY, jsonValue);
        return true;
      } else {
        // Use SQLite for mobile
        const database = await getDatabase();
        const result = await database.runAsync(
          `UPDATE ${NOTES_TABLE} SET title = ?, content = ?, updatedAt = ? WHERE id = ?`,
          [note.title, note.content, note.updatedAt, note.id]
        );
        return result.changes > 0;
      }
    } catch (e) {
      console.error('Error updating note:', e);
      return false;
    }
  },

  /**
   * Deletes a note from storage
   * @param id - The note ID to delete
   * @returns true if successful, false otherwise
   */
  async deleteNote(id: string): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        // Use AsyncStorage for web
        const notes = await this.getAllNotes();
        const filteredNotes = notes.filter(note => note.id !== id);
        const jsonValue = JSON.stringify(filteredNotes);
        await AsyncStorage.setItem(NOTES_KEY, jsonValue);
        return filteredNotes.length < notes.length; // Return true if a note was removed
      } else {
        // Use SQLite for mobile
        const database = await getDatabase();
        const result = await database.runAsync(
          `DELETE FROM ${NOTES_TABLE} WHERE id = ?`,
          [id]
        );
        return result.changes > 0;
      }
    } catch (e) {
      console.error('Error deleting note:', e);
      return false;
    }
  },

  /**
   * Clears all notes from storage
   * @returns true if successful, false otherwise
   */
  async clearNotes(): Promise<boolean> {
    try {
      if (Platform.OS === 'web') {
        // Use AsyncStorage for web
        await AsyncStorage.removeItem(NOTES_KEY);
        return true;
      } else {
        // Use SQLite for mobile
        const database = await getDatabase();
        await database.runAsync(`DELETE FROM ${NOTES_TABLE}`);
        return true;
      }
    } catch (e) {
      console.error('Error clearing notes:', e);
      return false;
    }
  },
};
