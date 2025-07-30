import GoalCard from './GoalCard';

const GoalList = ({ goals, onUpdate, isOffline }) => {
  return (
    <div className="goal-list">
      <h2>Your Savings Goals</h2>
      {goals.length === 0 ? (
        <p>No goals found. Add a new goal to get started!</p>
      ) : (
        <div className="goals-container">
          {goals.map(goal => (
            <GoalCard key={goal.id} goal={goal} onUpdate={onUpdate} isOffline={isOffline} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalList;// Added sorting functionality
