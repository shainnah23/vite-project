const Overview = ({ goals }) => {
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const completedGoals = goals.filter(goal => goal.savedAmount >= goal.targetAmount).length;
  
  return (
    <div className="overview">
      <h2>Overview</h2>
      <div className="stats">
        <div className="stat-item">
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        <div className="stat-item">
          <h3>Total Saved</h3>
          <p>${totalSaved.toLocaleString()}</p>
        </div>
        <div className="stat-item">
          <h3>Goals Completed</h3>
          <p>{completedGoals}</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;