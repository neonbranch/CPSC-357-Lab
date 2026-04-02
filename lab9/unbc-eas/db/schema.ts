/**
 * Database Schema using Drizzle ORM
 */

import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { NOTES_TABLE } from './dbconfig';

export const notes = sqliteTable(NOTES_TABLE, {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  tag: text('tag'),
  createdAt: text('createdAt').notNull(),
  updatedAt: text('updatedAt').notNull(),
});

export type NoteSchema = typeof notes.$inferSelect;
export type NewNoteSchema = typeof notes.$inferInsert;
