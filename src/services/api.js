import axios from 'axios';
import toast from 'react-hot-toast';

// Create a configured Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

// Generic Error Handler wrapper
const handleApiError = (error, fallbackMessage) => {
  const message = error.response?.data?.message || fallbackMessage || "An unexpected error occurred.";
  toast.error(message);
  console.error("API Fetch Error: ", error);
  throw error;
};

// -------------------------------------------------------------
// POST /api/contact
// -------------------------------------------------------------
export const submitContact = async (formData) => {
  try {
    const response = await apiClient.post('/api/contact', formData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to submit contact request.");
  }
};

// -------------------------------------------------------------
// POST /api/electrician
// (Handles complex payloads like cert arrays and resume files)
// -------------------------------------------------------------
export const submitElectrician = async (formDataPayload) => {
  try {
    // If we're using a native browser FormData object for file uploads, we need to pass it directly
    // Axios intelligently overrides 'Content-Type': 'multipart/form-data' automatically
    const isNativeFormData = formDataPayload instanceof FormData;
    
    const response = await apiClient.post('/api/electrician', formDataPayload, {
      headers: isNativeFormData ? { 'Content-Type': 'multipart/form-data' } : undefined
    });
    
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to submit electrician application.");
  }
};

// -------------------------------------------------------------
// POST /api/custom-plan
// -------------------------------------------------------------
export const submitCustomPlan = async (customRequestData) => {
  try {
    const response = await apiClient.post('/api/custom-plan', customRequestData);
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to initialize custom plan routing.");
  }
};
