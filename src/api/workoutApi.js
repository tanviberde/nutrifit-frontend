import axiosInstance from './axiosInstance';

export const getWorkouts = async (page = 0, size = 10) => {
  const response = await axiosInstance.get('/workouts', { params: { page, size, sort: 'workoutDate,desc' } });
  return response.data.data;
};

export const createWorkout = async (workoutData) => {
  const response = await axiosInstance.post('/workouts', workoutData);
  return response.data.data;
};

export const updateWorkout = async (workoutId, workoutData) => {
  const response = await axiosInstance.put(`/workouts/${workoutId}`, workoutData);
  return response.data.data;
};

export const deleteWorkout = async (workoutId) => {
  await axiosInstance.delete(`/workouts/${workoutId}`);
};