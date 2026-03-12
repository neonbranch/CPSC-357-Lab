import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute, RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList, Note } from '../types';
import Header from '../components/Header';
import { noteService } from '../service/noteService';
// Import date formatting utilities
import { formatCompactDateTime } from '../utils/dateUtils';
import { showAlert } from '../utils/alertUtils';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type NoteDetailsRouteProp = RouteProp<RootStackParamList, 'NoteDetails'>;

export default function NoteDetailsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<NoteDetailsRouteProp>();
  const { noteId } = route.params;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  const loadNote = useCallback(async () => {
    setLoading(true);
    const loadedNote = await noteService.getNoteById(noteId);
    setNote(loadedNote);
    setLoading(false);
  }, [noteId]);

  useEffect(() => {
    loadNote();
  }, [loadNote]);

  // Reload note when screen comes into focus (e.g., after returning from edit screen)
  useFocusEffect(
    useCallback(() => {
      loadNote();
    }, [loadNote])
  );

  const handleEdit = () => {
    if (note) {
      navigation.navigate('EditNote', { noteId: note.id });
    }
  };

  const handleDelete = () => {
    showAlert(
      'Delete Note',
      'Are you sure you want to delete this note? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await noteService.deleteNote(noteId);
            if (success) {
              navigation.goBack();
            } else {
              showAlert('Error', 'Failed to delete note. Please try again.');
            }
          },
        },
      ]
    );
  };


  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showSettings={false} showBack={true} />
        <View style={styles.centerContent}>
          <Text>Loading...</Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  if (!note) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showSettings={false} showBack={true} />
        <View style={styles.centerContent}>
          <Text>Note not found</Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header showSettings={false} showBack={true} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>{note.title}</Text>
          <Text style={styles.body}>{note.content}</Text>
          
          {/* Minimal Date Information */}
          <View style={styles.dateInfo}>
            <View style={styles.dateRow}>
              <Ionicons name="create-outline" size={14} color="#666" />
              <Text style={styles.dateText}>Created {formatCompactDateTime(note.createdAt)}</Text>
            </View>
            <View style={styles.dateRow}>
              <Ionicons name="time-outline" size={14} color="#666" />
              <Text style={styles.dateText}>Updated {formatCompactDateTime(note.updatedAt)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Cards */}
      <View style={styles.actionsContainer}>
        {/* Edit Card */}
        <TouchableOpacity style={styles.actionCard} onPress={handleEdit} activeOpacity={0.7}>
          <View style={styles.actionCardContent}>
            <View style={[styles.actionIconContainer, styles.editIconContainer]}>
              <Ionicons name="create-outline" size={24} color="#035642" />
            </View>
            <View style={styles.actionCardText}>
              <Text style={styles.actionCardTitle}>Edit Note</Text>
              <Text style={styles.actionCardSubtitle}>Modify this note</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </TouchableOpacity>

        {/* Delete Card */}
        <TouchableOpacity 
          style={[styles.actionCard, styles.deleteCard]} 
          onPress={handleDelete} 
          activeOpacity={0.7}
        >
          <View style={styles.actionCardContent}>
            <View style={[styles.actionIconContainer, styles.deleteIconContainer]}>
              <Ionicons name="trash-outline" size={24} color="#d32f2f" />
            </View>
            <View style={styles.actionCardText}>
              <Text style={[styles.actionCardTitle, styles.deleteTitle]}>Delete Note</Text>
              <Text style={styles.actionCardSubtitle}>Permanently remove</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </View>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 100,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  body: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 16,
  },
  dateInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 12,
    color: '#666',
  },
  actionsContainer: {
    padding: 16,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    gap: 12,
  },
  actionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteCard: {
    borderColor: '#ffebee',
    backgroundColor: '#fff5f5',
  },
  actionCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  editIconContainer: {
    backgroundColor: '#e8f5e9',
  },
  deleteIconContainer: {
    backgroundColor: '#ffebee',
  },
  actionCardText: {
    flex: 1,
  },
  actionCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  deleteTitle: {
    color: '#d32f2f',
  },
  actionCardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
});
