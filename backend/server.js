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
    console.error(err);
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

// Create HTTP server and integrate with WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected via WebSocket');
  
  // Send the current view count when a client connects
  ws.send(JSON.stringify({ views: getViewCount() }));

  // Broadcast updated view count to all clients whenever it changes
  ws.on('message', (message) => {
    if (message === 'update') {
      const updatedViews = updateViewCount();
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ views: updatedViews }));
        }
      });
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Endpoint to get and update the view count for HTTP requests
app.get('/views', (req, res) => {
  const views = updateViewCount();
  res.json({ views });

  // Notify WebSocket clients of the updated view count
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ views }));
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
