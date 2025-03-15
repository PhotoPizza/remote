/**
 * Simple WebSocket server for PhotoPizza Remote Control
 * This server emulates the PhotoPizza device for testing purposes
 */

import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import { networkInterfaces } from 'os';

// Configuration
const PORT = 8000;

// Default PhotoPizza configuration
const defaultConfig = {
  firmwareVersion: 'PhotoPizza v5',
  wifiSsid: 'PhotoPizza',
  wifiPassword: '9994501234',
  wsPort: 8000,
  state: 'waiting',
  framesLeft: 100,
  frame: 100,
  allSteps: 109295,
  pause: 100,
  delay: 300,
  speed: 5000,
  acceleration: 2000,
  shootingMode: 'inter',
  direction: 1
};

// Current configuration (will be updated by clients)
let currentConfig = { ...defaultConfig };

// Get local IP addresses
const getLocalIpAddresses = () => {
  const interfaces = networkInterfaces();
  const addresses = [];
  
  for (const interfaceName in interfaces) {
    const interfaceInfo = interfaces[interfaceName];
    for (const info of interfaceInfo) {
      // Skip internal and non-IPv4 addresses
      if (info.family === 'IPv4' && !info.internal) {
        addresses.push(info.address);
      }
    }
  }
  
  return addresses;
};

// Create HTTP server
const server = createServer();

// Create WebSocket server
const wss = new WebSocketServer({ server });

// Handle WebSocket connections
wss.on('connection', (ws, req) => {
  const clientIp = req.socket.remoteAddress;
  console.log(`Client connected from ${clientIp}`);
  
  // Send current configuration to the client
  ws.send(JSON.stringify(currentConfig));
  
  // Handle messages from clients
  ws.on('message', (message) => {
    try {
      console.log(`Received: ${message}`);
      const data = JSON.parse(message.toString());
      
      // Handle different message types
      if (data.config) {
        // Update configuration
        currentConfig = { ...currentConfig, ...data.config };
        console.log('Configuration updated:', currentConfig);
        
        // Broadcast updated configuration to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify(currentConfig));
          }
        });
      } else if (message.toString() === 'getConfig') {
        // Send current configuration
        ws.send(JSON.stringify(currentConfig));
      } else if (data.infinity !== undefined) {
        // Handle infinity mode
        console.log(`Infinity mode with direction: ${data.infinity}`);
        currentConfig.direction = data.infinity;
        currentConfig.state = 'infinity';
        
        // Broadcast to all clients
        wss.clients.forEach((client) => {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify(currentConfig));
          }
        });
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
  
  // Handle client disconnection
  ws.on('close', () => {
    console.log(`Client ${clientIp} disconnected`);
  });
  
  // Handle errors
  ws.on('error', (error) => {
    console.error(`Error with client ${clientIp}:`, error);
  });
});

// Start the server
server.listen(PORT, () => {
  const ipAddresses = getLocalIpAddresses();
  console.log(`WebSocket server started on port ${PORT}`);
  console.log('Available on:');
  console.log(`  - localhost:${PORT}`);
  ipAddresses.forEach(ip => {
    console.log(`  - ${ip}:${PORT}`);
  });
  console.log('\nUse these addresses in your PhotoPizza Remote Control app');
  console.log('Press Ctrl+C to stop the server');
});

// Simulate PhotoPizza device behavior
let simulationInterval = null;

// Start simulation when a client starts the process
const startSimulation = () => {
  if (simulationInterval) {
    clearInterval(simulationInterval);
  }
  
  currentConfig.state = 'started';
  currentConfig.framesLeft = currentConfig.frame;
  
  simulationInterval = setInterval(() => {
    // Update framesLeft
    if (currentConfig.framesLeft > 0) {
      currentConfig.framesLeft -= 1;
      
      // Calculate current step based on direction and frames left
      const stepPerFrame = currentConfig.allSteps / currentConfig.frame;
      const currentStep = currentConfig.direction === 1 
        ? (currentConfig.frame - currentConfig.framesLeft) * stepPerFrame
        : currentConfig.framesLeft * stepPerFrame;
      
      // Create status update
      const statusUpdate = {
        status: {
          framesLeft: currentConfig.framesLeft,
          currentStep: Math.round(currentStep)
        }
      };
      
      // Broadcast status to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(statusUpdate));
        }
      });
      
      console.log(`Frames left: ${currentConfig.framesLeft}`);
      
      // If finished, set state back to waiting
      if (currentConfig.framesLeft === 0) {
        currentConfig.state = 'waiting';
        clearInterval(simulationInterval);
        simulationInterval = null;
        
        // Notify clients
        wss.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(currentConfig));
          }
        });
        
        console.log('Simulation completed');
      }
    }
  }, 1000); // Update every second
};

// Watch for configuration changes to start/stop simulation
setInterval(() => {
  if (currentConfig.state === 'start' && !simulationInterval) {
    console.log('Starting simulation');
    startSimulation();
  } else if (currentConfig.state === 'stop' && simulationInterval) {
    console.log('Stopping simulation');
    clearInterval(simulationInterval);
    simulationInterval = null;
    currentConfig.state = 'waiting';
    
    // Notify clients
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send(JSON.stringify(currentConfig));
      }
    });
  }
}, 500);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  if (simulationInterval) {
    clearInterval(simulationInterval);
  }
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
}); 