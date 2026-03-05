/**
 * Format a date string to a readable format
 * @param {string} dateString - ISO date string or date string
 * @returns {string} Formatted date string (e.g., "March 5, 2026") or "N/A" if invalid
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return 'N/A';
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format a date string to a short format (MM/DD/YYYY)
 * @param {string} dateString - ISO date string or date string
 * @returns {string} Formatted date string (e.g., "03/05/2026") or "N/A" if invalid
 */
export const formatDateShort = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return 'N/A';
  
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

/**
 * Format a date string to include time
 * @param {string} dateString - ISO date string or date string
 * @returns {string} Formatted date string with time (e.g., "March 5, 2026 at 4:13 PM") or "N/A" if invalid
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) return 'N/A';
  
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
