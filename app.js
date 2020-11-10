const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
  {
    type: "password",
    name: "masterPassword",
    message: "What is the super secret master password?",
    mask: "*",
  },
];

// const passwordSafe = {
//   wifi: "123",
//   gmx: "qwertz",
// };
const passwordSafe = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

// passwordSafe.readFile("./db.json", "utf8", (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });

async function validateAccess(passwordSafe) {
  const { masterPassword } = await inquirer.prompt(questions);
  const password = passwordSafe[passwordName];

  if ((await masterPassword) !== passwordSafe.master) {
    console.error("Your password is invalid!");
    validateAccess();
    return;
  }

  if (password) {
    console.log(`Password ist ${password}`);
  } else {
    console.log("Unknown password");
  }
}
const args = process.argv.slice(2);
const passwordName = args[0];
console.log(`You want to know the password of '${passwordName}'`);

validateAccess(passwordSafe);
