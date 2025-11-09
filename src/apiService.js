// src/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Replace with your API base URL

export const fetchDataSource = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/vhm/fetch/vehicle/health`); // Replace '/your-endpoint' with the actual endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching data source:', error);
    throw error;
  }
};