import { WebSocketServer } from "ws";
import {client} from "@repo/db/client";


const server = new WebSocketServer({
  port: 3001,
});
server.on("connection", (ws) => {



  client.user.create({
    data: {
      updatedAt: new Date(),
      email: "ichiragkumar@gmail.com" + Math.random().toString(36),
      name: "ichiragkumar" + Math.random().toString(36),
      password: "123456" + Math.random().toString(36),
    },
  });
  ws.on("message", (message) => {
    console.log("received: %s", message);
  });
  ws.send("Hii there are you , are connected to ws server now");
});