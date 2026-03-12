/**
 * Alert Utility Functions
 * 
 * This file provides cross-platform alert functionality that works on web and mobile.
 * React Native's Alert.alert() doesn't work well on web, so we provide a web-compatible solution.
 */

import { Platform, Alert } from 'react-native';

/**
 * Button configuration for alerts
 */
export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

/**
 * Shows an alert dialog that works on both web and mobile platforms
 * 
 * @param title - The title of the alert
 * @param message - Optional message to display
 * @param buttons - Optional array of buttons (on web, uses confirm dialog)
 * 
 * Example:
 *   showAlert('Error', 'Something went wrong');
 *   showAlert('Delete', 'Are you sure?', [
 *     { text: 'Cancel', style: 'cancel' },
 *     { text: 'Delete', style: 'destructive', onPress: () => console.log('Deleted') }
 *   ]);
 */
export function showAlert(
  title: string,
  message?: string,
  buttons?: AlertButton[]
): void {
  if (Platform.OS === 'web') {
    // Web implementation using browser dialogs
    if (buttons && buttons.length > 0) {
      // For confirmation dialogs with buttons
      const fullMessage = message ? `${title}\n\n${message}` : title;
      const result = window.confirm(fullMessage);
      
      if (result) {
        // User clicked OK - find the action button (non-cancel button)
        const actionButton = buttons.find(btn => btn.style !== 'cancel') || buttons[0];
        if (actionButton?.onPress) {
          actionButton.onPress();
        }
      } else {
        // User clicked Cancel - find cancel button
        const cancelButton = buttons.find(btn => btn.style === 'cancel');
        if (cancelButton?.onPress) {
          cancelButton.onPress();
        }
      }
    } else {
      // Simple alert without buttons
      const fullMessage = message ? `${title}\n\n${message}` : title;
      window.alert(fullMessage);
    }
  } else {
    // Mobile implementation - use React Native Alert
    if (buttons && buttons.length > 0) {
      Alert.alert(title, message, buttons);
    } else {
      Alert.alert(title, message);
    }
  }
}
