import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor",
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer",
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor",
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress",
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender",
    },
  ],
};

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const findUserByName = (name) => {
  return users["users_list"].filter((user) => user["name"] === name);
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job && user["name"] === name
  );
};

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
  let result = null;
  if (name != undefined) {
    // add for job check if necessary
    if (job != undefined) {
      result = findUserByNameAndJob(name, job);
    } else {
      result = findUserByName(name);
    }
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  let id = idGenerator();
  userToAdd["id"] = id;
  addUser(userToAdd);
  res.status(201);
  res.send(userToAdd);
});
const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const deleteUserById = (id) => {
  return users["users_list"].filter((user) => user["id"] !== id);
};

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];
  let result = deleteUserById(id);
  users["users_list"] = result;
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res
      .status(200)
      .json({ message: `Item with ID ${id} deleted successfully` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
