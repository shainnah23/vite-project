import { useState, useEffect } from 'react'
import { fetchGoals } from './services/api'
import './App.css'
import GoalList from './components/GoalList'
import GoalForm from './components/GoalForm'
import Overview from './components/Overview'

// Fallback data when API is not available
const fallbackGoals = [
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
]

function App() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isOffline, setIsOffline] = useState(false)

  const loadGoals = async () => {
    try {
      setLoading(true)
      const data = await fetchGoals()
      setGoals(data)
      setError(null)
      setIsOffline(false)
    } catch (err) {
      setError('API not available. Using demo data.')
      setGoals(fallbackGoals)
      setIsOffline(true)
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
      
      {error && <div className={isOffline ? "warning" : "error"}>{error}</div>}
      
      {loading ? (
        <div className="loading">Loading goals...</div>
      ) : (
        <>
          <Overview goals={goals} />
          <div className="main-content">
            <GoalForm onGoalAdded={loadGoals} isOffline={isOffline} />
            <GoalList goals={goals} onUpdate={loadGoals} isOffline={isOffline} />
          </div>
        </>
      )}
    </div>
  )
}

export default App// Added error boundary
