import { useState } from 'react';
import { updateGoal, deleteGoal, makeDeposit } from '../services/api';

const GoalCard = ({ goal, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState(goal);
  const [depositAmount, setDepositAmount] = useState('');
  
  const progress = Math.min(100, Math.round((goal.savedAmount / goal.targetAmount) * 100));
  const remainingAmount = goal.targetAmount - goal.savedAmount;
  
  const today = new Date();
  const deadline = new Date(goal.deadline);
  const daysLeft = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
  
  const isCompleted = goal.savedAmount >= goal.targetAmount;
  const isWithin30Days = daysLeft <= 30 && daysLeft > 0;
  const isOverdue = daysLeft < 0 && !isCompleted;
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = async () => {
    try {
      await updateGoal(goal.id, editedGoal);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };
  
  const handleDelete = async () => {
    try {
      await deleteGoal(goal.id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };
  
  const handleDeposit = async () => {
    if (!depositAmount || isNaN(depositAmount) || Number(depositAmount) <= 0) return;
    
    try {
      await makeDeposit(goal.id, Number(depositAmount));
      setDepositAmount('');
      onUpdate();
    } catch (error) {
      console.error('Error making deposit:', error);
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedGoal({
      ...editedGoal,
      [name]: name === 'targetAmount' ? Number(value) : value
    });
  };
  
  return (
    <div className="goal-card">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={editedGoal.name}
            onChange={handleChange}
          />
          <input
            type="number"
            name="targetAmount"
            value={editedGoal.targetAmount}
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={editedGoal.category}
            onChange={handleChange}
          />
          <input
            type="date"
            name="deadline"
            value={editedGoal.deadline}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{goal.name}</h3>
          <p>Category: {goal.category}</p>
          <p>Target: ${goal.targetAmount}</p>
          <p>Saved: ${goal.savedAmount}</p>
          <p>Remaining: ${remainingAmount}</p>
          
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p>{progress}% Complete</p>
          
          {isCompleted ? (
            <div className="status completed">Completed!</div>
          ) : isOverdue ? (
            <div className="status overdue">Overdue!</div>
          ) : isWithin30Days ? (
            <div className="status warning">Deadline approaching! {daysLeft} days left</div>
          ) : (
            <div className="status">{daysLeft} days left</div>
          )}
          
          <div className="deposit-section">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              placeholder="Amount to deposit"
            />
            <button onClick={handleDeposit}>Deposit</button>
          </div>
          
          <div className="actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default GoalCard;