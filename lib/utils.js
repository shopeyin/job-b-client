export const formatDateToYYYYMMDD = (dateString) => {
    if (!dateString) return ''; // Handle empty or undefined dateString
    const date = new Date(dateString);
  
    // Check if the date is valid
    if (isNaN(date.getTime())) return ''; // Return empty string for invalid dates
  
    return date.toISOString().split("T")[0];
  };
  
