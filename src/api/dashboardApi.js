import axiosInstance from './axiosInstance';

export const getDailyDashboard = async (date) => {
  const params = date ? { date } : {};
  const response = await axiosInstance.get('/dashboard/daily', { params });
  return response.data.data;
};

export const getWeeklyDashboard = async (weekStart) => {
  const params = weekStart ? { weekStart } : {};
  const response = await axiosInstance.get('/dashboard/weekly', { params });
  return response.data.data;
};

export const getMonthlyDashboard = async (year, month) => {
  const params = {};
  if (year) params.year = year;
  if (month) params.month = month;
  const response = await axiosInstance.get('/dashboard/monthly', { params });
  return response.data.data;
};