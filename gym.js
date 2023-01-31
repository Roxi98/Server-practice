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
      if (answer === "igen") {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};
const addnewUser = () => {
  return new Promise((resolve, reject) => {
    rl.question("adja hozza az uj diakot ", async (answer) => {
      await axios.post(`http://localhost:3000/`, {
        oldname: changeUser,
        Name: answer,
      });

      resolve();
    });
  });
};
const changeUser = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      "kit szeretne megvaltoztatni? Irja be az ID-jet. ",
      async (answer) => {
        const response = await axios.get(`http://localhost:3000/${answer}`);
        const userNametoChange = response.data.name;
        rl.question("Mire szeretne megvalltoztatni? ", async (answer) => {
          const response = await axios.put(`http://localhost:3000/`, {
            oldName: userNametoChange,
            name: answer,
          });
          resolve();
        });
      }
    );
  });
};

const deleteUser = () => {
  return new Promise((resolve, reject) => {
    rl.question(
      "kit szeretne kitorolni? Irja be az ID-jet. ",
      async (answer) => {
        const response = await axios.delete(`http://localhost:3000/${answer}`);
        resolve();
      }
    );
  });
};

async function main() {
  const tanar = await authQuestion();

  if (tanar) {
    /* const ujdiak = await newUeser();

    if (ujdiak) {
      await addnewUser();
    }

    await changeUser();*/
    await deleteUser();
  }

  rl.close();
}

main();
