import axiosInstance from './axiosInstance';

export const getProfile = async () => {
  const response = await axiosInstance.get('/profile');
  return response.data.data;
};

export const updateProfile = async (profileData) => {
  const response = await axiosInstance.put('/profile', profileData);
  return response.data.data;
};