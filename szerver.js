const express = require("express");
const app = express();
const adatbazis = require("./adatbazis.json");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
const fs = require("fs");

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res, next) => {
  res.send("hiiii");
});
app.get("/:id", (req, res, next) => {
  const user = adatbazis.find(
    (person) => person.id === parseInt(req.params.id)
  );
  if (user) {
    res.send(user);
    return;
  }
  res.send("failed");
});
app.post("/", (req, res, next) => {
  const user = req.body;
  console.log(user);
  user.id = Math.floor(1000 + Math.random() * 9000);

  if (user) {
    adatbazis.push(user);

    fs.writeFile("adatbazis.json", JSON.stringify(adatbazis), (err) => {
      if (err) {
        console.log("jaj de rossz nem mukodik ");
      }
      console.log("sikerult hozza adva", adatbazis);
      res.send("success");
    });
  }
});
app.get("/:id", (req, res, next) => {
  const user = adatbazis.find(
    (person) => person.id === parseInt(req.params.id)
  );
  for (let i = 0; i < adatbazis.length; i++) {
    console.log(user);
    if (user.name === req.pamarams.name) {
    }
  }
  res.send(user);
});
app.put("/", (req, res, next) => {
  const user = adatbazis.find((person) => person.name === req.body.oldName);
  for (let i = 0; i < adatbazis.length; i++) {
    if (user.name === adatbazis[i].name) {
      adatbazis[i].name = req.body.name;
      fs.writeFile("adatbazis.json", JSON.stringify(adatbazis), (err) => {
        if (err) {
          console.log("jaj de rossz nem mukodik ");
        }
        console.log("sikerult hozza adva", adatbazis);
        res.send("success");
      });
    }
  }
});
app.delete("/:id", (req, res, next) => {
  const user = adatbazis.find((person) => {
    console.log(person.id, req.params.id);
    return person.id === parseInt(req.params.id);
  });
  const newDataBase = adatbazis.filter((person) => person.id !== user.id);
  console.log(newDataBase);
  fs.writeFile("adatbazis.json", JSON.stringify(newDataBase), (err) => {
    if (err) {
      console.log("jaj de rossz nem mukodik ");
    }
    console.log("sikerult kitorolni", newDataBase);
    res.send("success");
  });
});

app.listen(app.get("port"), () => {
  console.info(`Server listen on port ${app.get("port")}`);
});
