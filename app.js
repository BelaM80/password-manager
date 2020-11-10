const inquirer = require("inquirer");

console.log("PW4U");

const secretMasterPassword = "katze";
const questions = [
  {
    type: "input",
    name: "masterPassword",
    message: "What is the super secret master password?",
  },
];
const passwordSafe = {
  wifi: "123",
  gmx: "qwertz",
};

async function validateAccess() {
  const { masterPassword } = await inquirer.prompt(questions);

  if (masterPassword !== secretMasterPassword) {
    console.error("You are not welcome here! 👿");
    validateAccess();
    return;
  }
  const password = passwordSafe[passwordName];

  if (password) {
    console.log(`Password ist ${password}`);
  } else {
    console.log("Unknown password");
  }
}
const args = process.argv.slice(2);
const passwordName = args[0];
console.log(`You want to know the password of '${passwordName}'`);

validateAccess();
