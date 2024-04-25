import express from "express";
import cors from "cors";
import {
  addUser,
  getUsers,
  findUserById,
  findUserByName,
  findUserByJob,
  deleteUserById,
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
  getUsers(name, job)
    .then((result) => res.send({ users_list: result }))
    .catch((error) => {
      console.error("Error getting users:", error);
      res.status(404).send("Error getting users");
    });
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd)
    .then((result) => res.status(201).send(result))
    .catch((error) => {
      res.status(404).send("Error adding user");
    });
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  findUserById(id)
    .then((result) => res.send({ users_list: result }))
    .catch((error) => {
      console.error("Resource not found:", error);
      res.status(404).send("Resource not found");
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  deleteUserById(id)
    .then((result) =>
      res
        .status(204)
        .json({ message: `Item with ID ${id} deleted successfully` })
    )
    .catch((error) => {
      console.error("Resource not found:", error);
      res.status(404).send("Resource not found");
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
