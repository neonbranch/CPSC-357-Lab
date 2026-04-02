/**
 * Notes Storage - Platform-specific implementations
 * 
 * Metro bundler automatically resolves:
 * - Web: notesStorage.web.ts (AsyncStorage)
 * - Native: notesStorage.native.ts (SQLite with Drizzle)
 * 
 * This file is for TypeScript type checking only.
 * At runtime, Metro uses the platform-specific files.
 */

// Re-export from native for TypeScript (Metro will override at runtime)
export { notesStorage } from './notesStorage.native';
