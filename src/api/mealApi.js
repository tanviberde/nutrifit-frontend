import axiosInstance from './axiosInstance';

export const getMeals = async (page = 0, size = 10) => {
  const response = await axiosInstance.get('/meals', { params: { page, size, sort: 'mealDate,desc' } });
  return response.data.data;
};

export const createMeal = async (mealData) => {
  const response = await axiosInstance.post('/meals', mealData);
  return response.data.data;
};

export const updateMeal = async (mealId, mealData) => {
  const response = await axiosInstance.put(`/meals/${mealId}`, mealData);
  return response.data.data;
};

export const deleteMeal = async (mealId) => {
  await axiosInstance.delete(`/meals/${mealId}`);
};