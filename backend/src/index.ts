import cors from "cors";
import * as dotenv from "dotenv";
import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";

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

io.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });
});

app.get("/", async (req: Request, res: Response) => {
  res.json({ status: "Running" });
});

server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
