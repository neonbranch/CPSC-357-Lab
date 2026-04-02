/**
 * Database Connection with Drizzle ORM
 */

import { Platform } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { DATABASE_NAME, CREATE_NOTES_TABLE_SQL } from './dbconfig';
import { notes } from './schema';

let sqliteDb: SQLite.SQLiteDatabase | null = null;

async function getSQLiteDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (Platform.OS === 'web') {
    throw new Error('SQLite is not available on web. Use AsyncStorage instead.');
  }

  if (sqliteDb) {
    return sqliteDb;
  }

  try {
    sqliteDb = await SQLite.openDatabaseAsync(DATABASE_NAME);
    await sqliteDb.execAsync(CREATE_NOTES_TABLE_SQL);
    return sqliteDb;
  } catch (error) {
    console.error('Error initializing SQLite database:', error);
    throw error;
  }
}

let drizzleDb: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (Platform.OS === 'web') {
    throw new Error('SQLite is not available on web. Use AsyncStorage instead.');
  }

  if (drizzleDb) {
    return drizzleDb;
  }

  const sqliteDb = await getSQLiteDatabase();
  drizzleDb = drizzle(sqliteDb, { schema: { notes } });
  return drizzleDb;
}

export { notes };
