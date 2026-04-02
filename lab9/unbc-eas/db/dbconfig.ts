/**
 * Database Configuration
 * 
 * This file contains all database configuration details including:
 * - Database name
 * - Table names
 * - Table schemas (CREATE TABLE statements)
 */

// Database name
export const DATABASE_NAME = 'unbc_notes.db';

// Table names
export const NOTES_TABLE = 'notes';

/**
 * SQL statement to create the notes table
 * This table stores all user notes with their metadata
 */
export const CREATE_NOTES_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS ${NOTES_TABLE} (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tag TEXT,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
`;
