import axiosInstance from './axiosInstance';

export const getWeightEntries = async () => {
  const response = await axiosInstance.get('/weight');
  return response.data.data;
};

export const createWeightEntry = async (weightData) => {
  const response = await axiosInstance.post('/weight', weightData);
  return response.data.data;
};

export const updateWeightEntry = async (weightEntryId, weightData) => {
  const response = await axiosInstance.put(`/weight/${weightEntryId}`, weightData);
  return response.data.data;
};

export const deleteWeightEntry = async (weightEntryId) => {
  await axiosInstance.delete(`/weight/${weightEntryId}`);
};