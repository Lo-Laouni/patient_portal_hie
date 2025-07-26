// src/api/fhirClient.ts
import axios, { AxiosResponse } from 'axios';
// Define FHIR Patient resource type (simplified version)
import { Patient } from '../types/patient';
import { Bundle } from '../types/bundle';

// FHIR server base URL
const BASE_URL = 'http://34.68.200.64:8080/fhir'; // Adjust this based on your FHIR server

// Axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/fhir+json',
    Accept: 'application/fhir+json',
  },
});

// Get all patients
export const getAllPatients = async(): Promise<Patient[]> => {
  try {
    const response: AxiosResponse = await apiClient.get('/Patient');
    const patients = response.data.entry.map((entry: any) => entry.resource);
    return patients;
  } catch (error) {
    console.error('Error fetching patients:', error);
    throw error;
  }
};

// Get a single patient by ID
export const getPatientById = async(id: string): Promise<Bundle> => {
  try {
    const response: AxiosResponse = await apiClient.get(`/Bundle/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching patient with ID ${id}:`, error);
    throw error;
  }
};

// Create a new patient
export const createPatient = async(patient: Patient): Promise<Patient> => {
  try {
    const response: AxiosResponse = await apiClient.post('/Patient', patient);
    return response.data;
  } catch (error) {
    console.error('Error creating patient:', error);
    throw error;
  }
};

// Update an existing patient
export const updatePatient = async(id: string, patient: Patient): Promise<Patient> => {
  try {
    const response: AxiosResponse = await apiClient.put(`/Patient/${id}`, patient);
    return response.data;
  } catch (error) {
    console.error(`Error updating patient with ID ${id}:`, error);
    throw error;
  }
};

// Delete a patient by ID
export const deletePatient = async(id: string): Promise<void> => {
  try {
    await apiClient.delete(`/Patient/${id}`);
  } catch (error) {
    console.error(`Error deleting patient with ID ${id}:`, error);
    throw error;
  }
};
