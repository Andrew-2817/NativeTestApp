import axios from 'axios';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

export const fetchShifts = async (lat, lon) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/shifts`, {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch shifts: ' + error.message);
  }
};