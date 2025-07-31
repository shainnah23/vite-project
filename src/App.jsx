import { useState, useEffect } from 'react'
import { fetchGoals } from './services/api'
import './App.css'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'
import Overview from './components/Overview'

function App() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)

  const loadGoals = async () => {
    try {
      setLoading(true)
      const data = await fetchGoals()
      setGoals(data)
    } catch (error) {
      console.error('Error loading goals:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGoals()
  }, [])

  return (
    <div className="app">
      <header>
        <h1>Smart Goal Planner</h1>
      </header>
      
      {loading ? (
        <div className="loading">Loading goals...</div>
      ) : (
        <>
          <Overview goals={goals} />
          <div className="main-content">
            <GoalForm onGoalAdded={loadGoals} />
            <GoalList goals={goals} onUpdate={loadGoals} />
          </div>
        </>
      )}
    </div>
  )
}

export default App