export interface Profile {
  name: string;
  email: string;
  profession: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
  updatedAt: string;
}

export type RootStackParamList = {
  Profile: undefined;
  Home: undefined;
  NoteDetails: { noteId: string };
  CreateNote: undefined;
  EditNote: { noteId: string };
  Settings: undefined;
};
