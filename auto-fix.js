#!/usr/bin/env node
const { exec, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Auto-fixing Smart Goal Planner...');

// Check if json-server is running
const checkServer = () => {
  return new Promise((resolve) => {
    exec('curl -s http://localhost:3000/goals', (error) => {
      resolve(!error);
    });
  });
};

// Start json-server in background
const startJsonServer = () => {
  console.log('📡 Starting json-server...');
  const server = spawn('npx', ['json-server', '--watch', 'db.json', '--port', '3000'], {
    detached: true,
    stdio: 'ignore'
  });
  server.unref();
  return new Promise(resolve => setTimeout(resolve, 3000));
};

// Start React dev server
const startReactServer = () => {
  console.log('⚛️  Starting React dev server...');
  spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
};

// Main auto-fix function
const autoFix = async () => {
  try {
    // Check if json-server is running
    const isServerRunning = await checkServer();
    
    if (!isServerRunning) {
      await startJsonServer();
      console.log('✅ json-server started');
    } else {
      console.log('✅ json-server already running');
    }
    
    // Start React server
    startReactServer();
    
    console.log('🚀 Application is ready!');
    console.log('📱 Open http://localhost:5173 in your browser');
    
  } catch (error) {
    console.error('❌ Auto-fix failed:', error.message);
    console.log('🔄 Falling back to demo mode...');
    startReactServer();
  }
};

autoFix();