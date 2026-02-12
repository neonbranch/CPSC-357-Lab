import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage } from '../store/languageSlice';
import { getTranslation } from '../utils/translations';

const languages = ['en', 'fr', 'es'];

export default function LanguageSelector() {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const [showPicker, setShowPicker] = useState(false);
  const t = (key) => getTranslation(key, language);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => setShowPicker(!showPicker)}
      >
        <Text style={styles.buttonText}>
          Language: {t(language)}
        </Text>
      </TouchableOpacity>
      
      {showPicker && (
        <View style={styles.picker}>
          {languages.map((lang) => (
            <TouchableOpacity 
              key={lang}
              style={[styles.option, language === lang && styles.active]}
              onPress={() => {
                dispatch(setLanguage(lang));
                setShowPicker(false);
              }}
            >
              <Text style={styles.optionText}>{t(lang)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  picker: {
    position: 'absolute',
    top: 45,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    minWidth: 150,
    elevation: 5,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  active: {
    backgroundColor: '#e3f2fd',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
  },
});
