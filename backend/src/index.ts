import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";

dotenv.config({ path: "../.env" });
const port = process.env.BACKEND_PORT;

const corsConfig = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs)choke on 204
};

//bootstrap server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  // socket.io cors
  cors: corsConfig,
});

// express cors
app.use(cors(corsConfig));

type User = { username: string; socketId: string };
let users: User[] = [];

io.on("connection", (socket: Socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    console.log(`👋: User with socketId: ${socket.id} has disconnected `);

    //remove user from array
    users = users.filter((user) => user.socketId !== socket.id);

    //Sends the list of users to the client
    io.emit("users-response", users);
    socket.disconnect();
  });

  //sends the message to all the users on the server
  socket.on("message", ({ message, username }) => {
    io.emit("message-response", {
      date: new Date(),
      message: message,
      username: username,
    });
  });

  //Listens when a new user joins the server
  socket.on("new-user", (user: User) => {
    //Adds the new user to the list of users
    users.push(user);

    console.log(users);
    //Sends the list of users to the client
    io.emit("users-response", users);
  });
});

app.get("/", async (req: Request, res: Response) => {
  res.json({
    status: "Running",
    date: new Date(),
    name: "HrubjakDamian",
  });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
