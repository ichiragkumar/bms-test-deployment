import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";

const server = new WebSocketServer({
  port: 3001,
});

server.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", async (message) => {
    console.log("Received: %s", message);

    try {
      const user = await client.user.create({
        data: {
          updatedAt: new Date(),
          email: `user${Math.random().toString(36).substring(2)}@example.com`,
          name: `user${Math.random().toString(36).substring(2)}`,
          password: `securePassword${Math.random().toString(36).substring(2)}`,
        },
      });
      console.log("User created:", user);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });

  ws.send("Hi there! You are now connected to the WebSocket server.");
});