import express from "express";
import cors from "cors";
import {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
} from "./models/userservices.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const idGenerator = () => {
  let id = "";
  // generate random 3 letter
  for (let i = 0; i < 3; i++) {
    id += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }

  for (let j = 0; j < 3; j++) {
    id += Math.floor(Math.random() * 9);
  }
  return id;
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  console.log("here");
  getUsers(name, job)
    .then((result) => res.send({ users_list: result }))
    .catch((error) => {
      console.error("Error getting users:", error);
      res.status(404).send("Error getting users");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.status(201);
  res.send(userToAdd);
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = deleteUserById(id);
  users["users_list"] = result;
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res
      .status(204)
      .json({ message: `Item with ID ${id} deleted successfully` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
