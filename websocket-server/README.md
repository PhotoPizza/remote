# PhotoPizza WebSocket Test Server

This is a test server that emulates the PhotoPizza device for development and testing purposes.

## Features

- Emulates all functionality of the PhotoPizza device
- Provides WebSocket server on port 8000
- Responds to all commands from the PhotoPizza Remote Control app
- Simulates shooting process with status updates

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   node server.js
   ```

## Usage

1. Start the server
2. In the PhotoPizza Remote Control app, enter your computer's IP address (port 8000)
3. Connect to the server
4. Use the app as you would with a real PhotoPizza device

## Available Commands

The server responds to the following commands:

- `getConfig` - Returns the current configuration
- `{"config": {...}}` - Updates the configuration
- `{"infinity": 0/1}` - Starts continuous rotation (0 = counterclockwise, 1 = clockwise)

## Testing with Web Client

A test web client is included for testing the server without the Android app:

1. Start the HTTP server:
   ```bash
   node http-server.js
   ```

2. Open http://localhost:8080 in your browser
3. Use the test client to interact with the WebSocket server 