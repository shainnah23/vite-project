import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const fetchGoals = async () => {
  const response = await axios.get(`${API_URL}/goals`);
  return response.data;
};

export const createGoal = async (goal) => {
  const response = await axios.post(`${API_URL}/goals`, goal);
  return response.data;
};

export const updateGoal = async (id, goal) => {
  const response = await axios.patch(`${API_URL}/goals/${id}`, goal);
  return response.data;
};

export const deleteGoal = async (id) => {
  await axios.delete(`${API_URL}/goals/${id}`);
  return id;
};

export const makeDeposit = async (id, amount) => {
  const goal = await axios.get(`${API_URL}/goals/${id}`).then(res => res.data);
  const updatedAmount = goal.savedAmount + Number(amount);
  const response = await axios.patch(`${API_URL}/goals/${id}`, {
    savedAmount: updatedAmount
  });
  return response.data;
};// Added error handling for API calls
