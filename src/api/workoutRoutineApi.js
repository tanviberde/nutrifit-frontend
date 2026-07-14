import axiosInstance from './axiosInstance';

export const generateWorkoutRoutine = async (daysPerWeek, equipmentAccess) => {
  const body = {};
  if (daysPerWeek) body.daysPerWeek = daysPerWeek;
  if (equipmentAccess) body.equipmentAccess = equipmentAccess;
  const response = await axiosInstance.post('/workout-routines', body);
  return response.data.data;
};

export const getWorkoutRoutines = async (page = 0, size = 10) => {
  const response = await axiosInstance.get('/workout-routines', { params: { page, size } });
  return response.data.data;
};