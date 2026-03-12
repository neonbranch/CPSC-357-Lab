# UNBC Notes App

A simple mobile Notes app built with React Native and Expo using TypeScript.

## Features

- **Profile Management**: Create and edit your profile (Name, Email, Profession)
- **Notes Management**: Create, read, update, and delete notes
- **Local Storage**: All data stored locally using AsyncStorage
- **Clean UI**: Simple, minimal, and student-friendly design

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation (Native Stack)
- AsyncStorage for local storage
- Expo Vector Icons

## Project Structure

```
expo-app-v6/
├── app/                    # (Not used - using React Navigation instead)
├── components/             # Reusable components
│   ├── Header.tsx
│   ├── NoteCard.tsx
│   └── EmptyState.tsx
├── Screens/               # Screen components
│   ├── ProfileScreen.tsx
│   ├── HomeScreen.tsx
│   ├── NoteDetailsScreen.tsx
│   ├── CreateEditNoteScreen.tsx
│   └── SettingsScreen.tsx
├── navigator/             # Navigation setup
│   └── RootStackNavigator.tsx
├── storage/               # AsyncStorage utilities
│   ├── profileStorage.ts
│   └── notesStorage.ts
├── service/               # Business logic
│   └── noteService.ts
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
cd lab7/expo-app-v6
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
6. **Create/Edit Note**: Form to create or edit notes
7. **Settings**: View and edit profile, reset profile option

## Storage

- Profile data stored in AsyncStorage with key: `@unbc_notes_profile`
- Notes stored in AsyncStorage with key: `@unbc_notes_list`
- All data persists locally on device

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
- ✅ Local storage with AsyncStorage
- ✅ TypeScript for type safety

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (installed globally or via npx)
- Expo Go app on your mobile device (for testing)

## Notes

- This app does NOT use SQLite or Drizzle ORM
- All data is stored in AsyncStorage
- The app follows a simple academic/lab-style design
- Perfect for learning React Native and Expo basics
