import axiosInstance from './axiosInstance';

export const generateGroceryListFromRecipe = async (recipeId) => {
  const response = await axiosInstance.post(`/grocery-lists/from-recipe/${recipeId}`);
  return response.data.data;
};

export const getGroceryLists = async (page = 0, size = 10) => {
  const response = await axiosInstance.get('/grocery-lists', { params: { page, size } });
  return response.data.data;
};

export const toggleGroceryItem = async (groceryListId, itemId) => {
  const response = await axiosInstance.patch(`/grocery-lists/${groceryListId}/items/${itemId}/toggle`);
  return response.data.data;
};