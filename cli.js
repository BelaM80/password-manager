const { readCommandLineArguments } = require("./lib/commadLine");
const { setPassword, getPassword, deletePassword } = require("./lib/passwords");
const { askForMasterPassword } = require("./lib/questions");
const { isMasterPasswordCorrect } = require("./lib/validation");
require("dotenv").config();

const { connect, close } = require("./lib/database");

async function run() {
  console.log("Connecting to database...");
  await connect((process.env.MONGO_DB_URI, process.env.MONGO_DB_NAME));
  console.log("Connected to database 🎉");

  const masterPassword = await askForMasterPassword();

  if (!isMasterPasswordCorrect(masterPassword)) {
    console.log("That´s not the right password. Try again!");
    run();
    return;
  }

  const [passwordName, newPasswordValue] = readCommandLineArguments();
  if (!passwordName) {
    console.log("Missing password name");
    return process.exit(9);
  }

  if (passwordName === "delete") {
    const passwordToDelete = newPasswordValue;
    await deletePassword(passwordToDelete);
    console.log(`Password ${newPasswordValue} deleted`);
  } else if (newPasswordValue) {
    await setPassword(passwordName, newPasswordValue);
    console.log(`Password ${passwordName} set 🎉`);
  } else {
    const newPasswordValue = await getPassword(passwordName);
    console.log(`Your password is ${newPasswordValue} 🎉`);
  }
  await close();
}

run();
