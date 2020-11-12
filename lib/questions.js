const inquirer = require("inquirer");

async function askForMasterPassword() {
  const { masterPassword } = await inquirer.prompt([
    {
      type: "password",
      name: "masterPassword",
      message: "What is the super secret master password?",
      mask: "*",
    },
  ]);
  return masterPassword;
}

exports.askForMasterPassword = askForMasterPassword;
