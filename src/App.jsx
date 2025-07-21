import { useState, useEffect } from 'react'
import { fetchGoals } from './services/api'
import './App.css'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'
import Overview from './components/Overview'

function App() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadGoals = async () => {
    try {
      setLoading(true)
      const data = await fetchGoals()
      setGoals(data)
      setError(null)
    } catch (err) {
      setError('Failed to load goals. Please make sure json-server is running.')
      console.error('Error loading goals:', err)
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
      
      {error && <div className="error">{error}</div>}
      
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

export default App// Added error boundary
