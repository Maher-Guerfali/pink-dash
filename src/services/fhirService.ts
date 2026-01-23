import axios from 'axios';
import type { Bundle, Patient } from '../types/fhir';

// Public HAPI FHIR R4 sandbox.
const BASE_URL = 'https://hapi.fhir.org/baseR4';

// Shared axios client for FHIR calls.
const fhirClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/fhir+json',
    'Accept': 'application/fhir+json'
  }
});

/**
 * Helper to extract a user-friendly error message from an API error.
 */
export const getUserFriendlyError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Server responded with a status code outside the 2xx range
      if (error.response.status === 404) {
        return 'Resource not found.';
      }
      if (error.response.status >= 500) {
        return 'Server error. Please try again later.';
      }
      return `Request failed (${error.response.status}).`;
    } else if (error.request) {
      // Request was made but no response received
      return 'Network error. Please check your connection.';
    } else {
      // Other errors
      return error.message;
    }
  }
  return error instanceof Error ? error.message : 'An unexpected error occurred.';
};

export const PatientService = {
  /**
   * Fetches a list of patients from the FHIR server.
   * Uses a limit to prevent fetching too many records.
   */
  // Fetch a bundle of Patient resources, limited by _count.
  getPatients: async (limit: number = 20): Promise<Patient[]> => {
    try {
      // Searching for patients. We request json response.
      // We can adding filters here if needed.
      const response = await fhirClient.get<Bundle<Patient>>('/Patient', {
        params: {
          _count: limit
        }
      });

      if (!response.data.entry) {
        return [];
      }

      // Extract the patient resources from the bundle entries
      return response.data.entry
        .map(entry => entry.resource)
        .filter((resource): resource is Patient => resource.resourceType === 'Patient');
    } catch (error) {
      console.error('Error fetching patients:', error);
      throw error;
    }
  },

  /**
   * Fetches a single patient by ID.
   */
  // Fetch one Patient by id.
  getPatientById: async (id: string): Promise<Patient> => {
    try {
      const response = await fhirClient.get<Patient>(`/Patient/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching patient with id ${id}:`, error);
      throw error;
    }
  }
};
