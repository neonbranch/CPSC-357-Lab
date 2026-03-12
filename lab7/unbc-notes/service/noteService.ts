import { Note } from '../types';
import { notesStorage } from '../storage/notesStorage';

export const noteService = {
  async getAllNotes(): Promise<Note[]> {
    return await notesStorage.getAllNotes();
  },

  async getNoteById(id: string): Promise<Note | null> {
    const notes = await notesStorage.getAllNotes();
    return notes.find(note => note.id === id) || null;
  },

  async createNote(title: string, content: string): Promise<Note | null> {
    try {
      const notes = await notesStorage.getAllNotes();
      const newNote: Note = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: title.trim(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      notes.push(newNote);
      const success = await notesStorage.saveNotes(notes);
      return success ? newNote : null;
    } catch (e) {
      console.error('Error creating note:', e);
      return null;
    }
  },

  async updateNote(id: string, title: string, content: string): Promise<Note | null> {
    try {
      const notes = await notesStorage.getAllNotes();
      const noteIndex = notes.findIndex(note => note.id === id);
      
      if (noteIndex === -1) {
        return null;
      }

      const updatedNote: Note = {
        ...notes[noteIndex],
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date().toISOString(),
      };

      notes[noteIndex] = updatedNote;
      const success = await notesStorage.saveNotes(notes);
      return success ? updatedNote : null;
    } catch (e) {
      console.error('Error updating note:', e);
      return null;
    }
  },

  async deleteNote(id: string): Promise<boolean> {
    try {
      const notes = await notesStorage.getAllNotes();
      const filteredNotes = notes.filter(note => note.id !== id);
      return await notesStorage.saveNotes(filteredNotes);
    } catch (e) {
      console.error('Error deleting note:', e);
      return false;
    }
  },
};
