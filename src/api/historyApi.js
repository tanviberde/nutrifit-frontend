import axiosInstance from './axiosInstance';

export const getMealHistory = async (filters, page = 0, size = 10) => {
  const response = await axiosInstance.get('/history/meals', {
    params: { ...filters, page, size },
  });
  return response.data.data;
};

export const getWorkoutHistory = async (filters, page = 0, size = 10) => {
  const response = await axiosInstance.get('/history/workouts', {
    params: { ...filters, page, size },
  });
  return response.data.data;
};

export const getWeightHistory = async (filters, page = 0, size = 10) => {
  const response = await axiosInstance.get('/history/weight', {
    params: { ...filters, page, size },
  });
  return response.data.data;
};