/**
 * Note Service
 * 
 * This file provides business logic for managing notes.
 * It uses the appropriate storage (SQLite for Android/iOS, AsyncStorage for Web)
 * based on the platform.
 */

import { Note } from '../types';
import { notesStorage } from '../storage/notesStorage';

export const noteService = {
  /**
   * Gets all notes from the database
   * @returns Array of all notes, sorted by most recently updated
   */
  async getAllNotes(): Promise<Note[]> {
    return await notesStorage.getAllNotes();
  },

  /**
   * Gets a single note by its ID
   * @param id - The note ID to find
   * @returns The note if found, null otherwise
   */
  async getNoteById(id: string): Promise<Note | null> {
    return await notesStorage.getNoteById(id);
  },

  /**
   * Creates a new note
   * @param title - The note title
   * @param content - The note content
   * @returns The created note if successful, null otherwise
   */
  async createNote(title: string, content: string): Promise<Note | null> {
    try {
      // Create a new note object with unique ID
      const newNote: Note = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // Save the note to the database
      const success = await notesStorage.saveNote(newNote);
      return success ? newNote : null;
    } catch (e) {
      console.error('Error creating note:', e);
      return null;
    }
  },

  /**
   * Updates an existing note
   * @param id - The note ID to update
   * @param title - The new title
   * @param content - The new content
   * @returns The updated note if successful, null otherwise
   */
  async updateNote(id: string, title: string, content: string): Promise<Note | null> {
    try {
      // Get the existing note to preserve createdAt
      const existingNote = await notesStorage.getNoteById(id);
      
      if (!existingNote) {
        return null;
      }

      // Create updated note object
      const updatedNote: Note = {
        ...existingNote,
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date().toISOString(),
      };

      // Update the note in the database
      const success = await notesStorage.updateNote(updatedNote);
      return success ? updatedNote : null;
    } catch (e) {
      console.error('Error updating note:', e);
      return null;
    }
  },

  /**
   * Deletes a note
   * @param id - The note ID to delete
   * @returns true if successful, false otherwise
   */
  async deleteNote(id: string): Promise<boolean> {
    try {
      return await notesStorage.deleteNote(id);
    } catch (e) {
      console.error('Error deleting note:', e);
      return false;
    }
  },
};
