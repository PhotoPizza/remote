/**
 * Simple HTTP server for serving the test client
 */

import { createServer } from 'http';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const PORT = 8080;

// Create HTTP server
const server = createServer(async (req, res) => {
    try {
        // Serve test-client.html
        if (req.url === '/' || req.url === '/index.html') {
            const content = await readFile(join(__dirname, 'test-client.html'), 'utf8');
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
            return;
        }
        
        // Handle 404
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    } catch (error) {
        console.error('Error serving request:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`HTTP server running at http://localhost:${PORT}`);
    console.log('Open this URL in your browser to test the WebSocket connection');
}); 