/**
 * USER MODEL - Data Structure for Users
 * 
 * This class defines what a User looks like and provides helper methods.
 * It's like a blueprint for user data.
 * 
 * Purpose:
 * - Define user data structure
 * - Convert user data to safe response format (hides password)
 * - Validate user data before saving
 */

class UserModel {
  /**
   * Constructor - Create a new UserModel instance
   * @param {Object} data - User data (id, email, name, phone, avatar, password, createdAt)
   */
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.name = data.name;
    this.phone = data.phone || null;
    this.avatar = data.avatar || null;
    this.password = data.password;  // ⚠️ Never send this in responses!
    this.createdAt = data.createdAt || new Date().toISOString();
  }

  /**
   * Convert user to response format
   * Removes sensitive data like password before sending to client
   * @returns {Object} User object without password
   */
  toResponse() {
    // Destructure: get password separately, everything else goes to response
    const { password, ...response } = this;
    return response;  // Returns { id, email, name, createdAt } - NO PASSWORD!
  }

  /**
   * Convert an array of users to response format
   * @param {Array} users - Array of user objects
   * @returns {Array} Array of user response objects (without passwords)
   */
  static toResponseList(users) {
    return users.map(user => {
      // If already a UserModel, use it; otherwise create new one
      const model = user instanceof UserModel ? user : new UserModel(user);
      return model.toResponse();  // Remove password from each user
    });
  }

  /**
   * Validate user data before saving
   * Checks if email, name, phone, and password are valid
   * @param {Object} data - User data to validate
   * @returns {Object} { valid: boolean, errors: Array }
   */
  static validate(data) {
    const errors = [];
    
    // Check email
    if (!data.email || !data.email.includes('@')) {
      errors.push('Valid email required');
    }
    
    // Check name
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters');
    }
    
    // Check phone (optional, but if provided should be valid format)
    if (data.phone && data.phone.trim().length > 0) {
      // Basic phone validation: should contain only digits, spaces, dashes, parentheses, and +
      const phoneRegex = /^[\d\s\-\(\)\+]+$/;
      if (!phoneRegex.test(data.phone.trim())) {
        errors.push('Phone number contains invalid characters');
      }
      if (data.phone.trim().replace(/\D/g, '').length < 10) {
        errors.push('Phone number must contain at least 10 digits');
      }
    }
    
    // Check password (only if provided)
    if (data.password && data.password.length < 6) {
      errors.push('Password must be at least 6 characters');
    }
    
    return {
      valid: errors.length === 0,  // true if no errors
      errors                        // array of error messages
    };
  }
}

// Export the class so other files can use it
module.exports = UserModel;
