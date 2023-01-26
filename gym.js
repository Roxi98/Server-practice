const axios = require("axios");
const adatbazis = require("./adatbazis.json");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const authQuestion = () => {
  return new Promise((resolve, reject) => {
    rl.question("mi az ID szamja? ", async (answer) => {
      const response = await axios.get(`http://localhost:3000/${answer}`);
      console.log("Udvozoljuk!", response.data);
      resolve(true);
    });
  });
};
const newUeser = () => {
  return new Promise((resolve, reject) => {
    rl.question("van e uj diak? ", async (answer) => {
      const response = await axios.get(`http://localhost:3000/`);
      if (answer === "igen") {
        console.log(adatbazis);
      } else {
        changeUeser();
      }

      resolve(true);
    });
  });
};
const addnewUeser = () => {
  return new Promise((resolve, reject) => {
    rl.question("adja hozza az uj diakot ", async (answer) => {
      const response = await axios.post(`http://localhost:3000/`, {
        oldname: changeUeser,
        newname: answer,
      });

      resolve(answer);
    });
  });
};
const changeUeser = () => {
  return new Promise((resolve, reject) => {
    rl.question("kit szeretne megvaltoztatni? ", async (answer) => {
      const response = await axios.get(`http://localhost:3000/`, {
        name: answer,
      });

      resolve(answer);
    });
  });
};
const changedUeser = (changeUeser) => {
  return new Promise((resolve, reject) => {
    rl.question("Valtoztaott nev ? ", async (answer) => {
      const response = await axios.get(`http://localhost:3000/`, {
        oldname: changeUeser,
        newname: answwer,
      });

      resolve(answer);
    });
  });
};

async function main() {
  const tanar = await authQuestion();
  console.log(tanar);
  if (tanar) {
    const ujdiak = await newUeser();
    console.log(ujdiak);
    if (ujdiak) {
      const student = await addnewUeser();
      console.log(student);
      console.log("hii", student);
      if (student) {
        const change = await changeUeser();
        console.log("hello", change);
        if (change) {
          const changed = await changedUeser;
          if (changed) {
            const changedname = await changedUeser(change);
            console.log("Ujnev:", changedname);
          }
        }
      }
    }
  }

  rl.close();
}

main();
