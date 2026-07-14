import axiosInstance from './axiosInstance';

export const generateRecipe = async (calorieTarget, proteinTarget) => {
  const body = {};
  if (calorieTarget) body.calorieTarget = calorieTarget;
  if (proteinTarget) body.proteinTarget = proteinTarget;
  const response = await axiosInstance.post('/recipes', body);
  return response.data.data;
};

export const regenerateRecipe = async (recipeId) => {
  const response = await axiosInstance.post(`/recipes/${recipeId}/regenerate`);
  return response.data.data;
};

export const getRecipes = async (page = 0, size = 10) => {
  const response = await axiosInstance.get('/recipes', { params: { page, size } });
  return response.data.data;
};