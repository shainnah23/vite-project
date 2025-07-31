const { spawn } = require('child_process');
const axios = require('axios');

// Check if server is running
const checkServer = async () => {
  try {
    await axios.get('http://localhost:3000/goals');
    return true;
  } catch {
    return false;
  }
};

// Start json-server if not running
const startServer = () => {
  return new Promise((resolve) => {
    const server = spawn('npx', ['json-server', '--watch', 'db.json', '--port', '3000'], {
      stdio: 'inherit'
    });
    
    // Wait a bit for server to start
    setTimeout(() => {
      resolve(server);
    }, 2000);
  });
};

// Start development server
const startDev = () => {
  const dev = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit'
  });
  return dev;
};

// Main function
const main = async () => {
  console.log('Checking if json-server is running...');
  
  const isRunning = await checkServer();
  
  if (!isRunning) {
    console.log('Starting json-server...');
    await startServer();
  } else {
    console.log('json-server is already running');
  }
  
  console.log('Starting development server...');
  startDev();
};

main().catch(console.error);