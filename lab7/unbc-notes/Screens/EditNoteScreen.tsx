import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import Header from '../components/Header';
import { noteService } from '../service/noteService';
import { showAlert } from '../utils/alertUtils';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type EditNoteRouteProp = RouteProp<RootStackParamList, 'EditNote'>;

export default function EditNoteScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<EditNoteRouteProp>();
  const { noteId } = route.params;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  // Store original values to detect changes
  const [originalTitle, setOriginalTitle] = useState('');
  const [originalContent, setOriginalContent] = useState('');

  useEffect(() => {
    if (noteId) {
      loadNote();
    }
  }, [noteId]);

  /**
   * Loads the note data to edit
   */
  const loadNote = async () => {
    if (!noteId) return;
    const note = await noteService.getNoteById(noteId);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      // Store original values to detect changes
      setOriginalTitle(note.title);
      setOriginalContent(note.content);
    }
  };

  /**
   * Checks if there are unsaved changes
   */
  const hasUnsavedChanges = (): boolean => {
    // When editing, compare with original values
    return title.trim() !== originalTitle.trim() || content.trim() !== originalContent.trim();
  };

  /**
   * Handles the cancel button click
   * Shows confirmation dialog if there are unsaved changes
   */
  const handleCancel = () => {
    if (hasUnsavedChanges()) {
      // Show confirmation dialog if there are unsaved changes
      showAlert(
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          {
            text: 'Keep Editing',
            style: 'cancel',
          },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => {
              // Navigate back without saving
              navigation.goBack();
            },
          },
        ]
      );
    } else {
      // No changes, just go back
      navigation.goBack();
    }
  };

  /**
   * Handles updating the note
   */
  const handleUpdate = async () => {
    if (!title.trim()) {
      showAlert('Error', 'Title is required');
      return;
    }

    if (!noteId) {
      showAlert('Error', 'Note ID is missing');
      return;
    }

    setLoading(true);

    const updatedNote = await noteService.updateNote(noteId, title, content);
    const success = !!updatedNote;

    setLoading(false);

    if (success) {
      navigation.goBack();
    } else {
      showAlert('Error', 'Failed to update note. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header showSettings={false} showBack={true} title="Edit Note" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter note title"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Content</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter note content"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={10}
              textAlignVertical="top"
            />
          </View>

          {/* Button Container - Cancel and Update buttons side by side */}
          <View style={styles.buttonContainer}>
            {/* Cancel Button */}
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
              disabled={loading}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Update Button */}
            <TouchableOpacity
              style={[styles.button, styles.saveButton, loading && styles.buttonDisabled]}
              onPress={handleUpdate}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Updating...' : 'Update Note'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  textArea: {
    minHeight: 200,
    paddingTop: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  saveButton: {
    backgroundColor: '#035642', // UNBC Green
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
});
