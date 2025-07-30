import { useState } from 'react';
import { createGoal } from '../services/api';

const GoalForm = ({ onGoalAdded, isOffline }) => {
  const initialState = {
    name: '',
    targetAmount: '',
    savedAmount: 0,
    category: '',
    deadline: '',
  };
  
  const [formData, setFormData] = useState(initialState);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'targetAmount' ? (value ? Number(value) : '') : value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.targetAmount || !formData.category || !formData.deadline) {
      alert('Please fill in all fields');
      return;
    }
    
    if (isOffline) {
      alert('Cannot add goals in demo mode. Please connect to API.');
      return;
    }
    
    try {
      const newGoal = {
        ...formData,
        savedAmount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      await createGoal(newGoal);
      setFormData(initialState);
      onGoalAdded();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };
  
  return (
    <div className="goal-form">
      <h2>Add New Goal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Goal Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Travel Fund - Japan"
          />
        </div>
        
        <div>
          <label>Target Amount:</label>
          <input
            type="number"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            placeholder="e.g., 5000"
          />
        </div>
        
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g., Travel"
          />
        </div>
        
        <div>
          <label>Deadline:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Add Goal</button>
      </form>
    </div>
  );
};

export default GoalForm;// Added form validation
