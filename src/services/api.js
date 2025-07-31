import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Mock data for when server is not available
const mockGoals = [
  {
    id: "1",
    name: "Travel Fund - Japan",
    targetAmount: 5000,
    savedAmount: 3200,
    category: "Travel",
    deadline: "2025-12-31",
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "Emergency Fund",
    targetAmount: 10000,
    savedAmount: 7500,
    category: "Emergency",
    deadline: "2026-06-30",
    createdAt: "2023-05-01"
  }
];

let useMockData = false;
let mockDataStore = [...mockGoals];

const checkServerAndFallback = async (apiCall) => {
  if (useMockData) {
    return apiCall();
  }
  
  try {
    return await apiCall();
  } catch (error) {
    console.warn('API unavailable, switching to mock data');
    useMockData = true;
    return apiCall();
  }
};

export const fetchGoals = async () => {
  return checkServerAndFallback(async () => {
    if (useMockData) {
      return mockDataStore;
    }
    const response = await axios.get(`${API_URL}/goals`);
    return response.data;
  });
};

export const createGoal = async (goal) => {
  return checkServerAndFallback(async () => {
    if (useMockData) {
      const newGoal = { ...goal, id: Date.now().toString() };
      mockDataStore.push(newGoal);
      return newGoal;
    }
    const response = await axios.post(`${API_URL}/goals`, goal);
    return response.data;
  });
};

export const updateGoal = async (id, goal) => {
  return checkServerAndFallback(async () => {
    if (useMockData) {
      const index = mockDataStore.findIndex(g => g.id === id);
      if (index !== -1) {
        mockDataStore[index] = { ...mockDataStore[index], ...goal };
        return mockDataStore[index];
      }
      return goal;
    }
    const response = await axios.patch(`${API_URL}/goals/${id}`, goal);
    return response.data;
  });
};

export const deleteGoal = async (id) => {
  return checkServerAndFallback(async () => {
    if (useMockData) {
      mockDataStore = mockDataStore.filter(g => g.id !== id);
      return id;
    }
    await axios.delete(`${API_URL}/goals/${id}`);
    return id;
  });
};

export const makeDeposit = async (id, amount) => {
  return checkServerAndFallback(async () => {
    if (useMockData) {
      const goal = mockDataStore.find(g => g.id === id);
      if (goal) {
        goal.savedAmount += Number(amount);
        return goal;
      }
      return null;
    }
    const goal = await axios.get(`${API_URL}/goals/${id}`).then(res => res.data);
    const updatedAmount = goal.savedAmount + Number(amount);
    const response = await axios.patch(`${API_URL}/goals/${id}`, {
      savedAmount: updatedAmount
    });
    return response.data;
  });
};