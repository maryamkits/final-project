const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const fs = require("fs");
const app = express();
const secret = "demo__system";
const PORT = process.env.PORT || 3000;
const Joi = require("joi");

app.use(cors("*"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hello");
  console.log(processFile());
});

const usersfile = "../react-demo/src/db/users.json";
let ID;

app.post("/register", (req, res, err) => {
  console.log(req.body, "araferia");
  console.log("movedit");
  let {
    name,
    lastname,
    username,
    password,
    email,
    birthdate,
    balance
  } = req.body;
  fs.readFile(usersfile, function(err, data) {
    let json = JSON.parse(data);
    function findUsername(user) {
      return user.username === username;
    }
    if (json.find(findUsername)) {
      console.log("daemtxva");
    } else {
      fs.readFile(usersfile, function(err, data) {
        if (err) {
          console.log(err);
        }

        let json = JSON.parse(data);
        let last = json.pop();
        ID = "" + (Number(last.id) + 1);

        const user = {
          id: "" + ID,
          name,
          lastname,
          username,
          password: encrypt(password),
          email,
          birthdate,
          balance,
          level: 1,
          boughtProducts: []
        };

        fs.readFile(usersfile, function(err, data) {
          let json = JSON.parse(data);
          json.push(user);
          fs.writeFile(usersfile, JSON.stringify(json), function(err, data) {
            if (err) res.send(`http://localhost:${PORT}/`);
            res.send(`http://localhost:${PORT}/`);
          });
        });
      });
    }
  });
});

const encrypt = data => {
  const hash = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("hex");
  return hash;
};

app.post("/login", (req, res) => {
  let { username, password } = req.body;
  const schema = {
    username: Joi.string()
      .min(4)
      .required(),
    password: Joi.string()
      .min(4)
      .required()
  };
  const result = Joi.validate(req.body, schema);

  console.log(result);

  if (result.error) {
    return res.status(400).json({ message: result.error.details[0].message });
  }
  console.log(username);
  let foundUser = {
    id: -1,
    level: -1,
    auth: false
  };

  fs.readFile(usersfile, (err, data) => {
    let users = JSON.parse(data);
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].username == username &&
        users[i].password === encrypt(password)
      ) {
        foundUser = {
          id: users[i].id,
          level: users[i].level,
          auth: true,
          username: users[i].username
        };
        break;
      }
    }
    res.send(foundUser);
  });
});

app.post("/edit", (req, res) => {
  console.log(req.body);
  let newusername = req.body.newUsername;
  console.log(newusername);
  fs.readFile(usersfile, function(err, data) {
    let json = JSON.parse(data);
    function findUser(item) {
      return item.id == req.body.id;
    }
    let idx = json.findIndex(findUser);
    json[idx].username = newusername;
    fs.writeFile(usersfile, JSON.stringify(json), function(err) {
      if (err) res.json(err);
      res.json(json);
    });
  });
});

app.post("/delete", (req, res) => {
  let todeleteusername = req.body;
  fs.readFile(usersfile, function(err, data) {
    let json = JSON.parse(data);
    function findUser(item) {
      return item.username == todeleteusername.e;
    }
    let idx = json.findIndex(findUser);
    json.splice(idx, 1);
    fs.writeFile(usersfile, JSON.stringify(json), function(err) {
      if (err) res.json(err);
      res.json(json);
    });
  });
});

app.listen(5000, () => {
  console.log(`Listening Port - 5000`);
});
