# UNBC Notes App

A simple mobile Notes app built with React Native and Expo using TypeScript.

## Features

- **Profile Management**: Create and edit your profile (Name, Email, Profession)
- **Notes Management**: Create, read, update, and delete notes
- **Platform-Specific Storage**: 
  - Native (iOS/Android): SQLite with Drizzle ORM
  - Web: AsyncStorage
- **Auto-Refresh**: Note details automatically reload after updates
- **Clean UI**: Simple, minimal, and student-friendly design

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation (Native Stack)
- **Native Storage**: SQLite with Drizzle ORM (iOS/Android)
- **Web Storage**: AsyncStorage (Web platform)
- Expo Vector Icons
- Expo SQLite

## Project Structure

```
unbc-notes/
├── components/             # Reusable components
│   ├── Header.tsx
│   ├── NoteCard.tsx
│   └── EmptyState.tsx
├── Screens/               # Screen components
│   ├── ProfileScreen.tsx
│   ├── HomeScreen.tsx
│   ├── NoteDetailsScreen.tsx
│   ├── CreateNoteScreen.tsx
│   ├── EditNoteScreen.tsx
│   └── SettingsScreen.tsx
├── navigator/             # Navigation setup
│   └── RootStackNavigator.tsx
├── storage/               # Platform-specific storage implementations
│   ├── profileStorage.ts
│   ├── notesStorage.ts
│   ├── notesStorage.native.ts  # SQLite with Drizzle (Native)
│   └── notesStorage.web.ts     # AsyncStorage (Web)
├── db/                    # Database configuration
│   ├── database.ts
│   ├── dbconfig.ts
│   └── schema.ts
├── service/               # Business logic
│   ├── noteService.ts
│   └── profileService.ts
├── utils/                 # Utility functions
│   ├── alertUtils.ts
│   ├── dateUtils.ts
│   └── profileUtils.ts
├── types/                 # TypeScript type definitions
│   └── index.ts
├── assets/                # Images and icons
├── App.tsx                # Root component
├── index.js               # Entry point
└── package.json
```

## Installation

1. Navigate to the project directory:
```bash
cd unbc-notes
```

2. Install dependencies:
```bash
npm install
```

## Running the App

### Start the development server:
```bash
npm start
```

### Run on specific platform:
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## App Flow

1. **First Launch**: Shows profile screen to create your profile
2. **After Profile Creation**: Redirects to Home screen
3. **Subsequent Launches**: Opens Home screen directly if profile exists
4. **Home Screen**: 
   - Lists all notes
   - Floating + button to create new note
   - Settings icon in header
5. **Note Details**: View full note with edit and delete options
   - Automatically refreshes when returning from edit screen
6. **Create Note**: Form to create new notes
7. **Edit Note**: Form to edit existing notes
8. **Settings**: View and edit profile, reset profile option

## Storage

The app uses platform-specific storage implementations:

### Native (iOS/Android)
- **Notes**: SQLite database with Drizzle ORM
- **Profile**: AsyncStorage with key: `@unbc_notes_profile`
- All data persists locally on device

### Web
- **Notes**: AsyncStorage with key: `@unbc_notes_list`
- **Profile**: AsyncStorage with key: `@unbc_notes_profile`
- All data persists in browser's local storage

The Metro bundler automatically resolves the correct storage implementation at runtime based on the platform.

## Notes Data Structure

```typescript
interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
```

## Profile Data Structure

```typescript
interface Profile {
  name: string;
  email: string;
  profession: string;
}
```

## Features

- ✅ Profile onboarding on first launch
- ✅ Notes CRUD operations
- ✅ Clean and minimal UI
- ✅ Empty state handling
- ✅ Delete confirmation dialogs
- ✅ Smooth navigation
- ✅ Platform-specific storage (SQLite for native, AsyncStorage for web)
- ✅ Auto-refresh note details after updates
- ✅ TypeScript for type safety
- ✅ Date formatting utilities
- ✅ Alert utilities for user feedback

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (installed globally or via npx)
- Expo Go app on your mobile device (for testing)

## Notes

- **Native platforms (iOS/Android)**: Uses SQLite with Drizzle ORM for notes storage
- **Web platform**: Uses AsyncStorage for notes storage
- The app uses Metro bundler's platform-specific file resolution (`.native.ts` and `.web.ts`)
- Profile data is always stored in AsyncStorage across all platforms
- The app follows a simple academic/lab-style design
- Perfect for learning React Native, Expo, and platform-specific implementations
