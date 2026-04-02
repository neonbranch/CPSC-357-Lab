/**
 * Notes Storage for Native platforms (iOS/Android)
 * Uses SQLite with Drizzle ORM
 */

import { desc, eq } from 'drizzle-orm';
import { getDb } from '../db/database';
import { notes } from '../db/schema';
import { Note } from '../types';

export const notesStorage = {
  async getAllNotes(): Promise<Note[]> {
    try {
      const db = await getDb();
      const result = await db.select().from(notes).orderBy(desc(notes.updatedAt));
      return result as Note[];
    } catch (error) {
      console.error('Error getting notes from SQLite:', error);
      return [];
    }
  },

  async getNoteById(id: string): Promise<Note | null> {
    try {
      const db = await getDb();
      const result = await db
        .select()
        .from(notes)
        .where(eq(notes.id, id))
        .limit(1);

      return (result[0] as Note) || null;
    } catch (error) {
      console.error('Error getting note from SQLite:', error);
      return null;
    }
  },

  async saveNote(note: Note): Promise<boolean> {
    try {
      const db = await getDb();
      await db.insert(notes).values({
        id: note.id,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      });
      return true;
    } catch (error) {
      console.error('Error saving note to SQLite:', error);
      return false;
    }
  },

  async updateNote(note: Note): Promise<boolean> {
    try {
      const db = await getDb();
      await db
        .update(notes)
        .set({
          title: note.title,
          content: note.content,
          updatedAt: note.updatedAt,
        })
        .where(eq(notes.id, note.id));

      return true;
    } catch (error) {
      console.error('Error updating note in SQLite:', error);
      return false;
    }
  },

  async deleteNote(id: string): Promise<boolean> {
    try {
      const db = await getDb();
      await db.delete(notes).where(eq(notes.id, id));
      return true;
    } catch (error) {
      console.error('Error deleting note from SQLite:', error);
      return false;
    }
  },

  async clearNotes(): Promise<boolean> {
    try {
      const db = await getDb();
      await db.delete(notes);
      return true;
    } catch (error) {
      console.error('Error clearing notes from SQLite:', error);
      return false;
    }
  },
};
