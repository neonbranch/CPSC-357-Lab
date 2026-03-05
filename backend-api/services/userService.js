/**
 * USER SERVICE - Business Logic for Users
 * 
 * This file contains the business logic for user operations.
 * It sits between the controller (HTTP handling) and storage (database).
 * 
 * Think of it as: "What should happen when we want to get/create/update a user?"
 * 
 * Responsibilities:
 * - Validate data
 * - Apply business rules
 * - Format responses
 * - Handle errors
 */

const userStorage = require('../utils/userStorage');  // Database operations
const UserModel = require('../models/UserModel');     // User data structure

class UserService {
  /**
   * Get a user by their ID
   * @param {string} id - User ID
   * @returns {Object} Response object with success status and data
   */
  async getUserById(id) {
    try {
      // Try to find the user in the database
      const user = await userStorage.findUserById(id);
      
      // If user doesn't exist, return error
      if (!user) {
        return { 
          success: false, 
          message: 'User not found' 
        };
      }
      
      // User found! Convert to safe response format (removes password)
      return { 
        success: true, 
        message: 'User retrieved successfully', 
        data: new UserModel(user).toResponse()  // Remove password before sending
      };
    } catch (error) {
      // Something went wrong, return error
      return { 
        success: false, 
        message: 'Error retrieving user', 
        error: error.message 
      };
    }
  }

  /**
   * Get a user by their email address
   * @param {string} email - User email
   * @returns {Object} Response object with success status and data
   */
  async getUserByEmail(email) {
    try {
      const user = await userStorage.findUserByEmail(email);
      
      if (!user) {
        return { 
          success: false, 
          message: 'User not found' 
        };
      }
      
      return { 
        success: true, 
        message: 'User retrieved successfully', 
        data: new UserModel(user).toResponse() 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Error retrieving user', 
        error: error.message 
      };
    }
  }

  /**
   * Get all users
   * @returns {Object} Response object with array of users
   */
  async getAllUsers() {
    try {
      // Get all users from database
      const users = await userStorage.getAllUsers();
      
      // Convert all users to safe response format (removes passwords)
      return { 
        success: true, 
        message: 'Users retrieved successfully', 
        data: UserModel.toResponseList(users) 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Error retrieving users', 
        error: error.message 
      };
    }
  }

  /**
   * Create a new user
   * @param {Object} userData - User data (email, name, password)
   * @returns {Object} Response object with success status and created user
   */
  async createUser(userData) {
    try {
      // Check if user with this email already exists
      const existingUser = await userStorage.findUserByEmail(userData.email);
      
      if (existingUser) {
        return { 
          success: false, 
          message: 'User with this email already exists' 
        };
      }

      // Save the new user to database
      const user = await userStorage.saveUser(userData);
      
      // Return success response (without password)
      return { 
        success: true, 
        message: 'User created successfully', 
        data: new UserModel(user).toResponse() 
      };
    } catch (error) {
      return { 
        success: false, 
        message: 'Error creating user', 
        error: error.message 
      };
    }
  }

  /**
   * Check if a user exists by email
   * @param {string} email - Email to check
   * @returns {boolean} True if user exists, false otherwise
   */
  async userExists(email) {
    try {
      const user = await userStorage.findUserByEmail(email);
      return !!user;  // Convert to boolean (true if user exists)
    } catch (error) {
      return false;  // On error, assume user doesn't exist
    }
  }
}

// Export a single instance of the service (singleton pattern)
module.exports = new UserService();
