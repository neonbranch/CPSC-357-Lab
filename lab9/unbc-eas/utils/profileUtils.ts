/**
 * Profile Utility Functions
 * 
 * This file contains helper functions and constants for the profile page.
 * These make it easier to work with user profile data.
 */

/**
 * List of available profession options
 * Users can select one of these when creating their profile
 */
export const PROFESSION_OPTIONS = ['Student', 'Staff', 'Faculty', 'Guest'] as const;

/**
 * The default profession when the user first opens the profile page
 */
export const DEFAULT_PROFESSION = 'Student';

/**
 * Creates a full email address by combining the username with @unbc.ca
 * 
 * @param username - The part before @ (e.g., "john.doe")
 * @returns The full email address (e.g., "john.doe@unbc.ca")
 * 
 * Example: createFullEmail("john.doe") returns "john.doe@unbc.ca"
 */
export function createFullEmail(username: string): string {
  // Remove any extra spaces and combine with @unbc.ca
  const cleanUsername = username.trim();
  return `${cleanUsername}@unbc.ca`;
}

/**
 * Validates that all required profile fields are filled
 * 
 * @param name - User's name
 * @param emailPrefix - Email username (before @unbc.ca)
 * @param profession - Selected profession
 * @returns true if all fields are filled, false otherwise
 */
export function validateProfileFields(
  name: string,
  emailPrefix: string,
  profession: string
): boolean {
  // Check if all fields have content (after removing spaces)
  const hasName = name.trim().length > 0;
  const hasEmail = emailPrefix.trim().length > 0;
  const hasProfession = profession.trim().length > 0;
  
  // Return true only if all fields are filled
  return hasName && hasEmail && hasProfession;
}
