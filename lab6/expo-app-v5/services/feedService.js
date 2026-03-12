import { API_BASE_URL } from '../constants/api';

/**
 * Fetch feeds from the server
 * @returns {Promise<{success: boolean, data: array, message?: string}>}
 */
export const getFeeds = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/feeds`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok && data.success) {
      return {
        success: true,
        data: data.data.data || [],
        pagination: data.data.pagination || null,
        message: data.message,
      };
    } else {
      return {
        success: false,
        data: [],
        pagination: null,
        message: data.message || 'Failed to load feeds. Please try again.',
      };
    }
  } catch (error) {
    console.error('Feeds API error:', error);
    return {
      success: false,
      data: [],
      message: 'Network error. Please check your connection and try again.',
    };
  }
};
