import { WebSocketServer } from "ws";

import { client } from "@repo/db/client";

const server = new WebSocketServer({
  port: 3002,
});

server.on("connection",async (ws) => {
  console.log("New client connected");


   const user = await client.user.create({
        data: {
          updatedAt: new Date(),
          email: `user${Math.random().toString(36).substring(2)}@example.com`,
          name: `user${Math.random().toString(36).substring(2)}`,
          password: `securePassword${Math.random().toString(36).substring(2)}`,
        },
  });
  console.log("User created:", user);

  ws.on("message", async (message) => {
    console.log("Received: %s", message);
    
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.send("Hi there! You are now connected to the WebSocket server.");
});