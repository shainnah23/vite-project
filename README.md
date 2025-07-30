# Smart Goal Planner

A React application for tracking financial savings goals with CRUD operations and progress visualization.

## Features

- Create, read, update, and delete financial goals
- Track progress towards each goal with visual progress bars
- Make deposits to increase saved amounts
- View overview statistics (total goals, total saved, completed goals)
- Deadline tracking with warnings for approaching deadlines
- Mark goals as overdue if deadline has passed

## Technologies Used

- React
- Vite
- JSON Server (for REST API)
- Axios (for HTTP requests)

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

#### Development Mode
Run both the React development server and JSON Server concurrently:

```
npm run start:dev
```

This will start:
- JSON Server on http://localhost:3000
- React development server on http://localhost:5173

Alternatively, you can run them separately:

```
# Run JSON Server only
npm run server

# Run React development server only
npm run dev
```

#### Production Mode
For production deployment:

1. Set your production API URL in `.env.production`:
   ```
   VITE_API_URL=https://your-production-api.com/api
   ```

2. Build the application:
   ```
   npm run build
   ```

3. Deploy the `dist` folder to your hosting service

4. Make sure your production API supports the same endpoints as json-server

## Data Structure

The application uses a `db.json` file to store goal data with the following structure:

```json
{
  "goals": [
    {
      "id": "1",
      "name": "Travel Fund - Japan",
      "targetAmount": 5000,
      "savedAmount": 3200,
      "category": "Travel",
      "deadline": "2025-12-31",
      "createdAt": "2024-01-15"
    }
  ]
}
```## Testing\n\nRun tests with `npm test`
