import axiosInstance from './axiosInstance';

export const getWeeklyReport = async () => {
  const response = await axiosInstance.get('/ai/weekly-report');
  return response.data.data;
};

export const getDailyMotivation = async () => {
  const response = await axiosInstance.get('/ai/daily-motivation');
  return response.data.data;
};

export const getHabitAnalysis = async () => {
  const response = await axiosInstance.get('/ai/habit-analysis');
  return response.data.data;
};