require('dotenv').config(); //all env connect

const express = require('express');
const fs = require('fs');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;

// Path to store the view count in a JSON file
const viewsFilePath = path.join(__dirname, 'views.json');

// Helper function to read the current count
const getViewCount = () => {
  try {
    const data = fs.readFileSync(viewsFilePath, 'utf8');
    const { views } = JSON.parse(data);
    return views;
  } catch (err) {
    console.error('Error reading views:', err);
    return 0; // Return 0 if file doesn't exist or there's an error
  }
};

// Helper function to update the count
const updateViewCount = () => {
  const currentViews = getViewCount();
  const newViews = currentViews + 1;
  fs.writeFileSync(viewsFilePath, JSON.stringify({ views: newViews }));
  return newViews;
};

// Ensure `views.json` exists to avoid issues
if (!fs.existsSync(viewsFilePath)) {
  fs.writeFileSync(viewsFilePath, JSON.stringify({ views: 0 }));
}

// Create HTTP server and integrate with WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');
  
  // Increment view count when a client connects
  const updatedViews = updateViewCount();

  // Send updated view count to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ views: updatedViews }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Endpoint to get the current view count for HTTP requests
app.get('/views', (req, res) => {
  const views = getViewCount();
  res.json({ views });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
